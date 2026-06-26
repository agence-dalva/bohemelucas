import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(10),
  service: z.string().min(1),
  ville: z.string().min(2),
  message: z.string().min(20),
  _hp: z.string().max(0, "").optional(),
});

function buildEmailHtml(data: z.infer<typeof schema>): string {
  const now = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouvelle demande de devis — Bohème Lucas</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a2e;padding:28px 36px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#cc0000;">BOHÈME LUCAS</p>
              <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#ffffff;">Nouvelle demande de devis</p>
              <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.5);">${now}</p>
            </td>
          </tr>

          <!-- Service badge -->
          <tr>
            <td style="padding:24px 36px 0;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Service demandé</p>
              <p style="margin:6px 0 0;display:inline-block;background:#fff0f0;border:1px solid #ffcccc;color:#cc0000;font-size:14px;font-weight:700;padding:6px 14px;border-radius:4px;">${data.service}</p>
            </td>
          </tr>

          <!-- Contact info -->
          <tr>
            <td style="padding:24px 36px 0;">
              <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Coordonnées</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding-bottom:12px;vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.08em;">Nom</p>
                    <p style="margin:3px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">${data.prenom} ${data.nom}</p>
                  </td>
                  <td width="50%" style="padding-bottom:12px;vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.08em;">Commune</p>
                    <p style="margin:3px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">${data.ville}</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.08em;">Email</p>
                    <p style="margin:3px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">
                      <a href="mailto:${data.email}" style="color:#cc0000;text-decoration:none;">${data.email}</a>
                    </p>
                  </td>
                  <td width="50%" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.08em;">Téléphone</p>
                    <p style="margin:3px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">
                      <a href="tel:${data.telephone}" style="color:#cc0000;text-decoration:none;">${data.telephone}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:24px 36px 0;">
              <hr style="border:none;border-top:1px solid #ebebeb;margin:0;" />
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:24px 36px;">
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Message</p>
              <p style="margin:0;font-size:15px;color:#333;line-height:1.7;white-space:pre-wrap;">${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 36px 32px;">
              <a href="mailto:${data.email}" style="display:inline-block;background:#cc0000;color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:6px;">
                Répondre à ${data.prenom}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;border-top:1px solid #ebebeb;padding:16px 36px;">
              <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
                SARL Bohème Lucas · Champagney (70) · Franche-Comté &amp; Alsace
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data", details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot check — si rempli, on retourne 200 silencieusement sans envoyer
  if (data._hp && data._hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const html = buildEmailHtml(data);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key yet — log and return success so the form works in dev
    console.log("[contact] Resend not configured. Email would be sent to:", process.env.CONTACT_EMAIL);
    console.log("[contact] Data:", data);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Formulaire Bohème Lucas <contact@bohemelucas.fr>",
      to: [process.env.CONTACT_EMAIL ?? "contact@bohemelucas.fr"],
      reply_to: data.email,
      subject: `Demande de devis — ${data.service} (${data.prenom} ${data.nom}, ${data.ville})`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[contact] Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
