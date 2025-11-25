// lib/mail.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendMailArgs = {
  to: string;
  subject: string;
  html: string;
};

export async function sendMail({ to, subject, html }: SendMailArgs) {
  if (!to) return;

  await resend.emails.send({
    from: "National Journalist Association <onboarding@nja.org.in>", // MUST be valid + verified
    to,
    subject,
    html,
  });
}
