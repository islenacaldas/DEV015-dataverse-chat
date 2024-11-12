/*import { getApiKey } from "./apiKey.js";*/

import { getApiKey } from "./apiKey.js";


export const sendMessage = async (messages) => {
  //se obtiene la Api key del local storage del navegador
  const apiKey =getApiKey();
 
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192", // o 'gpt-4' si tienes acceso a este modelo
      messages: [{ role: 'user', content: messages }],
      max_tokens: 150 // Puedes ajustar el número de tokens según tus necesidades
    })
  });
  const data = await response.json();
  console.log('Respuesta de groq:', data.choices[0].message.content);
  return data.choices[0].message.content;
}