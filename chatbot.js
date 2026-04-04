const messagesEl = document.getElementById("chatbot-messages");
const inputEl = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `chatbot-message ${sender}`;
  msg.textContent = text;
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  addMessage(text, "user");
  inputEl.value = "";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();
  addMessage(data.reply, "bot");
}

sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
