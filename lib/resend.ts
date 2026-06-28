import { getLogoEmailHtml } from '@/components/Logo'
import { Resend } from 'resend'
import { getResendFromEmail, isResendConfigured } from './resend-config'

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

function buildSongEmailHtml(params: {
  recipientName: string
  occasion: string
  songPageUrl: string
  songUrls: string[]
}): string {
  const { recipientName, occasion, songPageUrl, songUrls } = params

  const downloadLinks = songUrls
    .map(
      (url, i) =>
        `<a href="${url}" style="color:#ff79a8;display:block;margin:8px 0;font-size:14px;">
      Download Version ${i + 1} (MP3)
    </a>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#0b0e1a;font-family:'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0e1a;min-height:100vh;">
    <tr><td align="center" style="padding:40px 20px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding-bottom:32px;">
          ${getLogoEmailHtml('md')}
        </td></tr>
        <tr><td style="padding-bottom:24px;">
          <h1 style="font-family:'Manrope',sans-serif;font-size:36px;font-weight:700;letter-spacing:-0.03em;color:#f0eee8;margin:0;line-height:1.1;">
            Your song for<br>
            <em style="color:#ff2d78;">${recipientName}</em><br>
            is ready. 🎵
          </h1>
        </td></tr>
        <tr><td style="padding-bottom:32px;">
          <span style="display:inline-block;background:rgba(255,45,120,0.1);border:1px solid rgba(255,45,120,0.3);border-radius:100px;padding:6px 16px;font-size:13px;color:#ff79a8;font-weight:700;">
            ${occasion}
          </span>
        </td></tr>
        <tr><td style="padding-bottom:32px;">
          <a href="${songPageUrl}"
             style="display:inline-block;background:linear-gradient(135deg,#ff2d78,#c026d3);color:white;text-decoration:none;padding:16px 36px;border-radius:100px;font-size:16px;font-weight:600;font-family:'Manrope',sans-serif;">
            Listen Now →
          </a>
        </td></tr>
        <tr><td style="padding-bottom:24px;border-top:1px solid rgba(240,238,232,0.08);"></td></tr>
        <tr><td style="padding-bottom:32px;">
          <p style="color:rgba(240,238,232,0.5);font-size:13px;margin:0 0 12px;">
            Or download the MP3 directly:
          </p>
          ${downloadLinks}
        </td></tr>
        <tr><td style="border-top:1px solid rgba(240,238,232,0.08);padding-top:24px;">
          <p style="color:rgba(240,238,232,0.3);font-size:12px;margin:0;">
            Made with love by Mockingbird.ai — the gift that hits different.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `
}

export async function sendSongEmail(params: {
  customerEmail: string
  recipientName: string
  occasion: string
  songPageUrl: string
  songUrls: string[]
}): Promise<{ id: string }> {
  if (!isResendConfigured()) {
    throw new Error('Resend is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel.')
  }

  const from = getResendFromEmail()!
  const { customerEmail, recipientName, occasion, songPageUrl, songUrls } = params

  const { data, error } = await getResend().emails.send({
    from,
    to: customerEmail,
    subject: `🎵 Your song for ${recipientName} is ready`,
    html: buildSongEmailHtml({ recipientName, occasion, songPageUrl, songUrls }),
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }

  if (!data?.id) {
    throw new Error('Resend did not return an email id')
  }

  return { id: data.id }
}

export async function sendTestEmail(to: string): Promise<{ id: string }> {
  if (!isResendConfigured()) {
    throw new Error('Resend is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.')
  }

  const from = getResendFromEmail()!

  const { data, error } = await getResend().emails.send({
    from,
    to,
    subject: 'Mockingbird.ai — Resend test',
    html: `
      <div style="font-family:sans-serif;padding:24px;">
        <h1>Mockingbird.ai email test ✅</h1>
        <p>If you received this, Resend is wired up correctly.</p>
      </div>
    `,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }

  if (!data?.id) {
    throw new Error('Resend did not return an email id')
  }

  return { id: data.id }
}
