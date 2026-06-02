
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* Health Check */

app.get("/", (req, res) => {
res.json({
status: "online",
assistant: "Chatur AI",
message: "Backend is running"
});
});

/* Chat Endpoint */

app.post("/chat", async (req, res) => {
try {

const { message } = req.body;

if (!message) {
  return res.status(400).json({
    error: "Message is required"
  });
}

const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are Chatur, a smart, friendly and helpful personal AI assistant."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1024
    })
  }
);

const data = await response.json();

if (!response.ok) {
  return res.status(response.status).json(data);
}

res.json({
  reply:
    data?.choices?.[0]?.message?.content ||
    "No response generated."
});

} catch (error) {

console.error(error);

res.status(500).json({
  error: "Internal Server Error",
  details: error.message
});

}
});

app.listen(PORT, () => {
console.log(
"Chatur AI backend running on port ${PORT}"
);
});