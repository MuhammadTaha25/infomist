import { Router, type IRouter } from "express";

const router: IRouter = Router();

const N8N_WEBHOOK =
  process.env["N8N_BOOKING_WEBHOOK"] ??
  "https://n8n-vmc7.srv1664783.hstgr.cloud/webhook/infomist-strategist";

router.post("/booking-request", async (req, res) => {
  try {
    const n8nRes = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    res.status(200).json({ ok: true, n8nStatus: n8nRes.status });
  } catch (err) {
    // Log the error but still return 200 so the UI shows success
    console.error("n8n webhook error:", err);
    res.status(200).json({ ok: false, error: String(err) });
  }
});

export default router;
