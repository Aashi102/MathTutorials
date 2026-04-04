import OpenAI from "openai";

export default async function handler(req, res) {
  const { message } = req.body;

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a friendly algebra tutor. Explain concepts clearly and show steps."
      },
      { role: "user", content: message }
    ]
  });

  res.status(200).json({
    reply: completion.choices[0].message.content
  });
}
