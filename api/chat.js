import Groq from "groq-sdk";

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are a friendly algebra tutor. Explain concepts clearly and show steps."
        },
        { role: "user", content: message }
      ]
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("Chatbot API Error:", error);

    return res.status(500).json({
      reply: "Sorry, I had trouble responding. Try again!"
    });
  }
}
