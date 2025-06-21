import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // load environment variables

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/workout", async (req, res) => {
  const { mood } = req.body;

  if (!mood) return res.status(400).json({ error: "Mood is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You're a fitness coach who gives mood-based workout suggestions.",
        },
        {
          role: "user",
          content: `I feel ${mood}. What should my workout be today? Keep it short and motivational.`,
        },
      ],
    });

    const workout = completion.choices[0].message.content;
    res.json({ workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

export default router;
