export function emailLayout(title: string, bodyHtml: string): string {
  return `
  <div style="background:#0D0B08;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#17140F;border:1px solid #2A2419;border-radius:16px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #2A2419;">
        <div style="color:#F2E9D8;font-size:18px;font-weight:600;">Шафраноф</div>
        <div style="color:#9C9483;font-size:12px;margin-top:2px;">Ресторан в Чите</div>
      </div>
      <div style="padding:28px;">
        <h1 style="color:#F2E9D8;font-size:18px;margin:0 0 16px;">${title}</h1>
        ${bodyHtml}
      </div>
    </div>
  </div>`;
}

export function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;color:#9C9483;font-size:13px;">${label}</td>
    <td style="padding:6px 0;color:#F2E9D8;font-size:13px;text-align:right;">${value}</td>
  </tr>`;
}

export function table(rows: string): string {
  return `<table style="width:100%;border-collapse:collapse;">${rows}</table>`;
}
