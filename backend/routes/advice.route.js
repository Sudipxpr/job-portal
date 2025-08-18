import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const geminiRes = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );
    const reply = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ reply });
  } catch (err) {
    console.log("Gemini API error:", err.response?.data || err.message);
    res.status(500).json({ reply: "AI service error." });
  }
});

export default router;