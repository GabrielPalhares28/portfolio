import { z } from 'zod';
import nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Schema de validação com Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  subject: z.string().min(3, 'Assunto deve ter no mínimo 3 caracteres').max(200),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres').max(5000),
});

// Rate limiting simples (em memória)
const rateLimit = new Map<string, number[]>();
const MAX_REQUESTS = 3; // 3 mensagens
const TIME_WINDOW = 60 * 60 * 1000; // por hora

/** Erro esperado que se traduz em uma resposta HTTP conhecida. */
class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

/** Descreve qualquer valor lançado de forma legível nos logs. */
function describeError(error: unknown): string {
  if (error instanceof Error) {
    return error.stack ?? `${error.name}: ${error.message}`;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

/**
 * O corpo chega como objeto já desserializado, mas também pode vir como string
 * (ou vazio) quando o Content-Type não é JSON.
 */
function parseBody(body: unknown): unknown {
  if (typeof body !== 'string') {
    return body;
  }
  if (!body.trim()) {
    throw new HttpError(400, 'Corpo da requisição vazio');
  }
  try {
    return JSON.parse(body);
  } catch (error) {
    console.error('Corpo da requisição não é JSON válido:', describeError(error));
    throw new HttpError(400, 'Corpo da requisição não é um JSON válido');
  }
}

/** Falha cedo e de forma explícita quando o ambiente não está configurado. */
function getMailConfig() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    const missing = [!user && 'EMAIL_USER', !pass && 'EMAIL_PASS'].filter(Boolean);
    console.error(
      `Configuração de email ausente: ${missing.join(', ')} não definida(s).`
    );
    throw new HttpError(
      500,
      'Serviço de email indisponível. Tente outro canal de contato.'
    );
  }

  return { user, pass, to: process.env.EMAIL_TO || user };
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimit.get(ip) || [];
  
  // Remove requisições antigas
  const recentRequests = requests.filter(time => now - time < TIME_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Apenas POST permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método não permitido' 
    });
  }

  try {
    // Rate limiting
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    const ipString = Array.isArray(ip) ? ip[0] : ip;
    
    if (!checkRateLimit(ipString)) {
      return res.status(429).json({
        success: false,
        message: 'Muitas requisições. Tente novamente em 1 hora.',
      });
    }

    // Validação dos dados
    const validatedData = contactSchema.parse(parseBody(req.body));
    const { name, email, subject, message } = validatedData;

    const mailConfig = getMailConfig();

    // Configurar transporter (usando Gmail como exemplo)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass, // Use App Password do Gmail
      },
    });

    // Configurar email
    const mailOptions = {
      from: mailConfig.user,
      to: mailConfig.to,
      replyTo: email,
      subject: `[Portfólio] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
            .label { font-weight: bold; color: #667eea; }
            .message-box { background: white; padding: 20px; margin-top: 20px; border-radius: 5px; border: 1px solid #e0e0e0; }
            .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📬 Nova mensagem do Portfólio</h2>
            </div>
            <div class="content">
              <div class="info">
                <p><span class="label">👤 Nome:</span> ${name}</p>
              </div>
              <div class="info">
                <p><span class="label">📧 Email:</span> <a href="mailto:${email}">${email}</a></p>
              </div>
              <div class="info">
                <p><span class="label">📝 Assunto:</span> ${subject}</p>
              </div>
              <div class="message-box">
                <p><span class="label">💬 Mensagem:</span></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <div class="footer">
                <p>Enviado em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nova mensagem do portfólio

Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}

---
Enviado em: ${new Date().toLocaleString('pt-BR')}
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    // Resposta de sucesso
    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Responderei em breve.',
    });

  } catch (error: unknown) {
    console.error('Erro ao processar mensagem de contato:', describeError(error));

    // Erro esperado com status próprio
    if (error instanceof HttpError) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    // Erro de validação
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    // Erro genérico
    return res.status(500).json({
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
    });
  }
}