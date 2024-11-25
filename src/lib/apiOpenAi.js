import { getApiKey } from "./apiKey.js";

export const sendMessage = async (messages) => {
  const apiKey = getApiKey();

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // o 'gpt-4' si tienes acceso a este modelo
        messages: messages,
        max_tokens: 150, // Puedes ajustar el número de tokens según tus necesidades
      }),
    }
  );

  const data = await response.json();
  const responseMessage = data.choices[0].message.content;

  const conversation = [...messages];
  // Guardar la conversación en localStorage
  // const currentConversation = JSON.parse(localStorage.getItem('conversation')) || [];
  //currentConversation.push({ role: 'user', content: messages });
  conversation.push({ role: 'assistant', content: responseMessage });
  //localStorage.setItem('conversation', JSON.stringify(currentConversation));

  return conversation;
}
