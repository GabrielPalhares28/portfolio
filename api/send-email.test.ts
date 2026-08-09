import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const sendMail = vi.fn();

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail })),
  },
}));

type JsonBody = {
  success: boolean;
  message: string;
  errors?: { field: string; message: string }[];
};

function createResponse() {
  const res = {
    statusCode: 0,
    body: undefined as JsonBody | undefined,
    ended: false,
    headers: {} as Record<string, string>,
    setHeader(name: string, value: string) {
      res.headers[name] = value;
    },
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(body: JsonBody) {
      res.body = body;
      return res;
    },
    end() {
      res.ended = true;
      return res;
    },
  };
  return res;
}

type TestResponse = ReturnType<typeof createResponse>;

function createRequest(overrides: Partial<VercelRequest> = {}) {
  return {
    method: 'POST',
    headers: { 'x-forwarded-for': '1.2.3.4' },
    body: {
      name: 'Gabriel',
      email: 'gabriel@example.com',
      subject: 'Contato',
      message: 'Mensagem com mais de dez caracteres',
    },
    ...overrides,
  } as VercelRequest;
}

async function loadHandler() {
  vi.resetModules();
  const module = await import('./send-email');
  return module.default;
}

async function call(req: VercelRequest) {
  const handler = await loadHandler();
  const res = createResponse();
  await handler(req, res as unknown as VercelResponse);
  return res;
}

describe('send-email handler', () => {
  beforeEach(() => {
    sendMail.mockReset();
    sendMail.mockResolvedValue({ messageId: 'abc' });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    process.env.EMAIL_USER = 'sender@example.com';
    process.env.EMAIL_TO = 'inbox@example.com';
  });

  it('sets CORS headers on every request', async () => {
    const res = await call(createRequest());

    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(res.headers['Access-Control-Allow-Methods']).toBe('GET,OPTIONS,POST');
    expect(res.headers['Access-Control-Allow-Credentials']).toBe('true');
  });

  it('answers preflight requests with 200 and no body', async () => {
    const res = await call(createRequest({ method: 'OPTIONS' }));

    expect(res.statusCode).toBe(200);
    expect(res.ended).toBe(true);
    expect(res.body).toBeUndefined();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects methods other than POST', async () => {
    const res = await call(createRequest({ method: 'GET' }));

    expect(res.statusCode).toBe(405);
    expect(res.body).toEqual({ success: false, message: 'Método não permitido' });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('sends the email and returns success for a valid payload', async () => {
    const res = await call(createRequest());

    expect(res.statusCode).toBe(200);
    expect(res.body?.success).toBe(true);
    expect(sendMail).toHaveBeenCalledTimes(1);

    const mailOptions = sendMail.mock.calls[0][0];
    expect(mailOptions).toMatchObject({
      from: 'sender@example.com',
      to: 'inbox@example.com',
      replyTo: 'gabriel@example.com',
      subject: '[Portfólio] Contato',
    });
    expect(mailOptions.html).toContain('Gabriel');
    expect(mailOptions.text).toContain('Mensagem com mais de dez caracteres');
  });

  it('falls back to EMAIL_USER when EMAIL_TO is not set', async () => {
    delete process.env.EMAIL_TO;

    await call(createRequest());

    expect(sendMail.mock.calls[0][0].to).toBe('sender@example.com');
  });

  it('returns 400 with field level errors for invalid payloads', async () => {
    const res = await call(
      createRequest({
        body: { name: 'G', email: 'not-an-email', subject: 'ok', message: 'curta' },
      })
    );

    expect(res.statusCode).toBe(400);
    expect(res.body?.message).toBe('Dados inválidos');
    expect(res.body?.errors?.map((error) => error.field).sort()).toEqual([
      'email',
      'message',
      'name',
      'subject',
    ]);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 400 when the body is missing', async () => {
    const res = await call(createRequest({ body: undefined }));

    expect(res.statusCode).toBe(400);
    expect(res.body?.success).toBe(false);
  });

  it('returns 500 when sending the email fails', async () => {
    sendMail.mockRejectedValue(new Error('SMTP down'));

    const res = await call(createRequest());

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
    });
  });

  it('allows 3 requests per IP and then returns 429', async () => {
    const handler = await loadHandler();

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const res = createResponse();
      await handler(createRequest(), res as unknown as VercelResponse);
      expect(res.statusCode).toBe(200);
    }

    const blocked = createResponse();
    await handler(createRequest(), blocked as unknown as VercelResponse);

    expect(blocked.statusCode).toBe(429);
    expect(blocked.body?.message).toBe('Muitas requisições. Tente novamente em 1 hora.');
    expect(sendMail).toHaveBeenCalledTimes(3);
  });

  it('rate limits each IP independently and forgets requests older than the window', async () => {
    vi.useFakeTimers();
    try {
      const handler = await loadHandler();
      const send = async (headers: VercelRequest['headers']) => {
        const res = createResponse();
        await handler(createRequest({ headers }), res as unknown as VercelResponse);
        return res;
      };

      for (let attempt = 0; attempt < 3; attempt += 1) {
        await send({ 'x-forwarded-for': '1.1.1.1' });
      }
      expect((await send({ 'x-forwarded-for': '1.1.1.1' })).statusCode).toBe(429);
      expect((await send({ 'x-real-ip': '2.2.2.2' })).statusCode).toBe(200);
      expect((await send({})).statusCode).toBe(200);

      vi.advanceTimersByTime(60 * 60 * 1000 + 1);
      expect((await send({ 'x-forwarded-for': '1.1.1.1' })).statusCode).toBe(200);
    } finally {
      vi.useRealTimers();
    }
  });

  it('uses the first value when x-forwarded-for carries a list', async () => {
    const handler = await loadHandler();
    const send = async () => {
      const res = createResponse();
      await handler(
        createRequest({ headers: { 'x-forwarded-for': ['9.9.9.9', '8.8.8.8'] } }),
        res as unknown as VercelResponse
      );
      return res;
    };

    const responses: TestResponse[] = [];
    for (let attempt = 0; attempt < 4; attempt += 1) {
      responses.push(await send());
    }

    expect(responses.map((res) => res.statusCode)).toEqual([200, 200, 200, 429]);
  });
});
