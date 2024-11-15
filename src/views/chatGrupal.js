import { nav } from "../componentes/nav.js";
import { sendMessage } from "../lib/apiOpenAi.js";
import data from "../data/dataset.js";

export const chatGrupal = () => {
  const chatGroupContainer = document.createElement("div");
  chatGroupContainer.classList.add("chat-group");

  chatGroupContainer.innerHTML = `
    <h1>Chat Grupal</h1>
    <div id="chat-window" class="chat-window"></div>
    <form id="chat-form" class="chat-form">
      <input type="text" id="user-input" placeholder="Escribe tu mensaje aquí..." required />
      <button type="submit">Enviar</button>
    </form>
  `;

  const chatWindow = chatGroupContainer.querySelector("#chat-window");
  const chatForm = chatGroupContainer.querySelector("#chat-form");
  const userInput = chatGroupContainer.querySelector("#user-input");

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value;
    userInput.value = ""; // Corrige el typo aquí

    // Agregar el mensaje del usuario a la ventana del chat
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.textContent = message; // Corrige el typo aquí
    chatWindow.appendChild(userMessageDiv);

    // Enviar el mensaje a la API y obtener la respuesta
    const response = await sendMessage(message); // Asegúrate de que sendMessage devuelve una promesa que resuelve a un string o array de strings

    // Agregar la respuesta de la API a la ventana del chat
    const responseDiv = document.createElement("div");
    responseDiv.classList.add("response-message");
    responseDiv.textContent = response; // Asume que response es un string
    chatWindow.appendChild(responseDiv);

    // Desplazar la ventana del chat hacia abajo
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });

  return chatGroupContainer;
};
