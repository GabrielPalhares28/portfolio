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

// Origens autorizadas a chamar a API
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Rate limiting simples (em memória)
const rateLimit = new Map<string, number[]>();
const MAX_REQUESTS = 3; // 3 mensagens
const TIME_WINDOW = 60 * 60 * 1000; // por hora

// Usa o IP mais à direita da cadeia de proxies: os anteriores podem ser forjados
// pelo cliente através do header X-Forwarded-For.
function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const chain = Array.isArray(forwarded) ? forwarded.join(',') : forwarded;
  const hops = (chain ?? '').split(',').map((hop) => hop.trim()).filter(Boolean);

  return hops[hops.length - 1] || req.socket?.remoteAddress || 'unknown';
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
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
    if (!checkRateLimit(getClientIp(req))) {
      return res.status(429).json({
        success: false,
        message: 'Muitas requisições. Tente novamente em 1 hora.',
      });
    }

    // Validação dos dados
    const validatedData = contactSchema.parse(req.body);
    const { name, email, subject, message } = validatedData;
    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      subject: escapeHtml(subject),
      message: escapeHtml(message),
    };

    // Configurar transporter (usando Gmail como exemplo)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password do Gmail
      },
    });

    // Configurar email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfólio] ${subject.replace(/[\r\n]+/g, ' ')}`,
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
                <p><span class="label">👤 Nome:</span> ${safe.name}</p>
              </div>
              <div class="info">
                <p><span class="label">📧 Email:</span> <a href="mailto:${safe.email}">${safe.email}</a></p>
              </div>
              <div class="info">
                <p><span class="label">📝 Assunto:</span> ${safe.subject}</p>
              </div>
              <div class="message-box">
                <p><span class="label">💬 Mensagem:</span></p>
                <p style="white-space: pre-wrap;">${safe.message}</p>
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
    console.error('Erro ao enviar email:', error);

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