import nodemailer, { Transporter } from 'nodemailer';

const globalForMailer = globalThis as unknown as { mailer?: Transporter };

function createTransport(): Transporter | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null; // почта не настроена — это ок для локальной разработки
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

const mailer = globalForMailer.mailer ?? createTransport() ?? undefined;
if (process.env.NODE_ENV !== 'production' && mailer) {
  globalForMailer.mailer = mailer;
}

export async function sendEmail(params: { to: string; subject: string; html: string }): Promise<void> {
  if (!mailer) {
    console.warn(`[mailer] SMTP не настроен — письмо "${params.subject}" для ${params.to} не отправлено`);
    return;
  }

  try {
    await mailer.sendMail({
      from: process.env.SMTP_FROM ?? 'Шафраноф <no-reply@shafranoff.ru>',
      to: params.to,
      subject: params.subject,
      html: params.html
    });
  } catch (error) {
    // Уведомление — вспомогательная функция: сбой почты не должен ломать
    // создание заказа/брони/заявки, которое уже сохранено в БД.
    console.error('[mailer] Не удалось отправить письмо:', error);
  }
}
