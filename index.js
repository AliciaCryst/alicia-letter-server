import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = "sk-..."; // replace with your actual key

app.post("/generate", async (req, res) => {
  const prompt = `Write a kind, poetic letter from Alicia Cryst to someone visiting her shrine, who may be feeling lost or unloved.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const letter = data.choices?.[0]?.message?.content?.trim();
    res.json({ letter });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to generate letter");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Alicia letter server is running on port ${PORT}`);
});

