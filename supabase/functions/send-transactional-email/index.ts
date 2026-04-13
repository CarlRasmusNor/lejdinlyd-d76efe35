import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = "rasmuscarl@hotmail.com";
const FROM = "LejDinLyd <noreply@lej-din-lyd.dk>";
const GOOGLE_REVIEW_URL = "https://g.page/r/INDSAET_DIN_GOOGLE_REVIEW_LINK/review";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Email templates ────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" });
}

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; overflow: hidden; }
    .header { background: #111; padding: 28px 32px; border-bottom: 1px solid #2a2a2a; }
    .logo { font-size: 22px; font-weight: 700; color: #f97316; letter-spacing: -0.5px; }
    .body { padding: 32px; }
    .h1 { font-size: 22px; font-weight: 700; color: #fff; margin: 0 0 8px; }
    .lead { font-size: 15px; color: #999; margin: 0 0 28px; }
    .info-box { background: #111; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #222; font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #777; }
    .info-value { color: #fff; font-weight: 600; }
    .price { color: #f97316; font-size: 20px; font-weight: 700; }
    .btn { display: inline-block; background: #f97316; color: #fff !important; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 15px; margin: 8px 0; }
    .footer { padding: 24px 32px; text-align: center; font-size: 12px; color: #555; border-top: 1px solid #2a2a2a; }
    .tag { display: inline-block; background: #f97316/10; border: 1px solid rgba(249,115,22,0.2); color: #f97316; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
    p { color: #aaa; font-size: 14px; line-height: 1.6; margin: 0 0 16px; }
    strong { color: #fff; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="logo">LejDinLyd</div>
      </div>
      <div class="body">${content}</div>
      <div class="footer">
        LejDinLyd · Kjellerupsgade 4, 9000 Aalborg · CVR: 43952919<br/>
        <a href="https://lej-din-lyd.dk" style="color: #f97316; text-decoration: none;">lej-din-lyd.dk</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function bookingConfirmationHtml(d: Record<string, unknown>): string {
  const dateFrom = formatDate(d.dateFrom as string);
  const dateTo = d.dateTo && d.dateTo !== d.dateFrom ? formatDate(d.dateTo as string) : null;
  const dateRange = dateTo ? `${dateFrom} – ${dateTo}` : dateFrom;

  return baseLayout(`
    <div class="tag">Booking modtaget</div>
    <p class="h1">Tak for din forespørgsel, ${d.name}! 🎉</p>
    <p class="lead">Vi har modtaget din booking og vender tilbage hurtigst muligt for at bekræfte.</p>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Dato</span>
        <span class="info-value">${dateRange}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Antal højttalere</span>
        <span class="info-value">${d.speakerCount} stk</span>
      </div>
      <div class="info-row">
        <span class="info-label">Total pris</span>
        <span class="info-value price">${d.totalPrice} DKK</span>
      </div>
      <div class="info-row">
        <span class="info-label">Betaling</span>
        <span class="info-value">Kontant ved overlevering</span>
      </div>
    </div>

    <p>Afhentning sker på <strong>Kjellerupsgade 4, 9000 Aalborg</strong> – vi aftaler et tidspunkt der passer dig.</p>
    <p>Har du spørgsmål? Ring til os på <strong>+45 53 54 00 96</strong> eller svar på denne email.</p>

    <div style="margin-top: 28px;">
      <a href="https://lej-din-lyd.dk" class="btn">Gå til hjemmesiden</a>
    </div>
  `);
}

function newBookingAdminHtml(d: Record<string, unknown>): string {
  const dateFrom = formatDate(d.dateFrom as string);
  const dateTo = d.dateTo && d.dateTo !== d.dateFrom ? formatDate(d.dateTo as string) : null;
  const dateRange = dateTo ? `${dateFrom} – ${dateTo}` : dateFrom;

  return baseLayout(`
    <div class="tag">Ny booking</div>
    <p class="h1">Ny bookingforespørgsel!</p>
    <p class="lead">En ny kunde har booket via lej-din-lyd.dk. Bekræft eller afvis i admin-panelet.</p>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Navn</span>
        <span class="info-value">${d.name}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Email</span>
        <span class="info-value">${d.email}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Telefon</span>
        <span class="info-value">${d.phone}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Dato</span>
        <span class="info-value">${dateRange}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Højttalere</span>
        <span class="info-value">${d.speakerCount} stk</span>
      </div>
      <div class="info-row">
        <span class="info-label">Pris</span>
        <span class="info-value price">${d.totalPrice} DKK</span>
      </div>
      ${d.message ? `<div class="info-row" style="flex-direction: column; gap: 6px;">
        <span class="info-label">Besked</span>
        <span class="info-value" style="font-weight: 400; color: #bbb;">${d.message}</span>
      </div>` : ""}
    </div>

    <div style="margin-top: 28px;">
      <a href="https://lej-din-lyd.dk/admin" class="btn">Åbn admin-panel</a>
    </div>
  `);
}

function reviewRequestHtml(d: Record<string, unknown>): string {
  return baseLayout(`
    <div class="tag">Vi håber du nød festen! 🎶</div>
    <p class="h1">Tak fordi du lejede hos LejDinLyd, ${d.name}!</p>
    <p class="lead">Håber din fest gik fantastisk. Vi vil meget gerne høre om din oplevelse.</p>

    <p>Det tager kun <strong>30 sekunder</strong> at give os en Google-anmeldelse, og det hjælper os enormt med at nå ud til andre festholdere i Aalborg.</p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${GOOGLE_REVIEW_URL}" class="btn">⭐ Giv os en anmeldelse</a>
    </div>

    <div class="info-box">
      <p style="margin: 0; font-size: 13px; color: #666;">Har du feedback til os – godt eller skidt? Svar bare på denne email. Vi læser alle beskeder og bruger dem til at gøre oplevelsen bedre for næste kunde.</p>
    </div>

    <p>Skal du bruge lyd til din næste fest? Book direkte på <a href="https://lej-din-lyd.dk/#booking" style="color: #f97316;">lej-din-lyd.dk</a> 🎉</p>
  `);
}

// ─── Main handler ────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY ikke sat. Se opsætningsvejledning." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { templateName, recipientEmail, templateData } = body;

    let to: string;
    let subject: string;
    let html: string;

    switch (templateName) {
      case "booking-confirmation":
        to = recipientEmail;
        subject = "Din booking er modtaget – LejDinLyd 🎶";
        html = bookingConfirmationHtml(templateData);
        break;

      case "new-booking-admin":
        to = OWNER_EMAIL;
        subject = `📋 Ny booking fra ${templateData.name} – ${templateData.totalPrice} DKK`;
        html = newBookingAdminHtml(templateData);
        break;

      case "review-request":
        to = recipientEmail;
        subject = "Tak for dit leje – del din oplevelse med andre 🎉";
        html = reviewRequestHtml(templateData);
        break;

      default:
        return new Response(
          JSON.stringify({ error: `Ukendt template: ${templateName}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend fejl:", err);
      return new Response(
        JSON.stringify({ error: "Email-afsendelse fejlede", detail: err }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Intern fejl" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
