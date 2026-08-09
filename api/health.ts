import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Healthcheck: reporta se as variáveis necessárias para o envio de email estão
 * configuradas, evitando que a falta de configuração só apareça quando alguém
 * tenta enviar uma mensagem.
 */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  const missingEnv = (['EMAIL_USER', 'EMAIL_PASS'] as const).filter(
    (name) => !process.env[name]
  );

  if (missingEnv.length > 0) {
    console.error(
      `Healthcheck: variáveis de ambiente ausentes: ${missingEnv.join(', ')}.`
    );
    return res.status(503).json({
      status: 'degraded',
      email: 'unconfigured',
      missingEnv,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    status: 'ok',
    email: 'configured',
    timestamp: new Date().toISOString(),
  });
}
