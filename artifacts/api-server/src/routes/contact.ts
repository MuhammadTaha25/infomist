import { Router, type IRouter } from "express";

const router: IRouter = Router();

/**
 * n8n webhook for the "Deploy a Project" / Contact form.
 * Set N8N_CONTACT_WEBHOOK in the environment to override the default.
 */
const N8N_CONTACT_WEBHOOK =
  process.env["N8N_CONTACT_WEBHOOK"] ??
  "https://n8n-vmc7.srv1664783.hstgr.cloud/webhook/infomist-lead";

router.post("/contact-request", async (req, res) => {
  try {
    const n8nRes = await fetch(N8N_CONTACT_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    res.status(200).json({ ok: true, n8nStatus: n8nRes.status });
  } catch (err) {
    // Log the error but still return 200 so the UI shows success
    console.error("n8n contact webhook error:", err);
    res.status(200).json({ ok: false, error: String(err) });
  }
});

export default router;
