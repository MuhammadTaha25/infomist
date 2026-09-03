/**
 * Vercel serverless function — proxies the "Talk to a Strategist" scheduling
 * form submission to the Infomist n8n booking webhook.
 *
 * The frontend POSTs JSON to /api/booking-request; this forwards it to n8n and
 * always answers 200 so the UI can show a success state even if n8n is briefly
 * unavailable. Override the target with the N8N_BOOKING_WEBHOOK env var.
 */

const N8N_BOOKING_WEBHOOK =
  process.env.N8N_BOOKING_WEBHOOK ??
  "https://n8n-vmc7.srv1664783.hstgr.cloud/webhook/infomist-strategist";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const body =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
    const n8nRes = await fetch(N8N_BOOKING_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    res.status(200).json({ ok: true, n8nStatus: n8nRes.status });
  } catch (err) {
    console.error("n8n booking webhook error:", err);
    res.status(200).json({ ok: false, error: String(err) });
  }
}
