import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, subject, message } = await req.json();

  if (!email || !subject || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Boolean(process.env.SMTP_SECURE), // true pour 465, false pour autres ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Stackuracy Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL, 
      replyTo: email,
      subject: `[Contact Stackuracy] ${subject}`,
      text: message + `\n\nDe : ${email}`,
      html: `<div style="white-space: pre-wrap;">${message}</div><hr/><p>De : <a href="mailto:${email}">${email}</a></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Impossible d’envoyer l’e-mail" }, { status: 500 });
  }
}