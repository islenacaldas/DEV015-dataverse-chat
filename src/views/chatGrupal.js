import { sendMessage } from "../lib/apiOpenAi.js";
import data from "../data/dataset.js";
import { getElementDataById } from "../lib/dataFunction.js";

export const chatGrupal = () => {
  const chatGroupContainer = document.createElement("div");
  chatGroupContainer.classList.add("chat-group");

  const title = document.createElement("h1");
  title.textContent = "Chat Grupal con Inventores";
  chatGroupContainer.appendChild(title);

  const listTitle = document.createElement("h2");
  listTitle.textContent = "Selecciona un inventor para chatear:";
  chatGroupContainer.appendChild(listTitle);

  const list = document.createElement("ul");

  data.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item.name;
    listItem.addEventListener("click", () => {
      startChat(item.id);
    });
    list.appendChild(listItem);
  });

  chatGroupContainer.appendChild(list);

  const chatWindow = document.createElement("div");
  chatWindow.classList.add("chat-window");
  chatGroupContainer.appendChild(chatWindow);

  const chatForm = document.createElement("form");
  chatForm.classList.add("chat-form");

  const userInput = document.createElement("input");
  userInput.type = "text";
  userInput.placeholder = "Escribe tu mensaje aquí...";
  userInput.required = true;
  chatForm.appendChild(userInput);

  const sendButton = document.createElement("button");
  sendButton.type = "submit";
  sendButton.textContent = "Enviar";
  chatForm.appendChild(sendButton);

  chatGroupContainer.appendChild(chatForm);

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value;
    userInput.value = "";

    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.textContent = message;
    chatWindow.appendChild(userMessageDiv);

    const response = await sendMessage(message);

    const responseDiv = document.createElement("div");
    responseDiv.classList.add("response-message");
    responseDiv.textContent = response;
    chatWindow.appendChild(responseDiv);

    chatWindow.scrollTop = chatWindow.scrollHeight;
  });

  async function startChat(inventorId) {
    const inventor = getElementDataById(data, inventorId);
    if (!inventor) {
      console.error("Inventor no encontrado");
      return;
    }

    const introMessage = `Hola ${inventor.name}, ¿puedes contarme más sobre tu invento?`;
    const introMessageDiv = document.createElement("div");
    introMessageDiv.classList.add("user-message");
    introMessageDiv.textContent = introMessage;
    chatWindow.appendChild(introMessageDiv);

    const response = await sendMessage(introMessage);
    const responseDiv = document.createElement("div");
    responseDiv.classList.add("response-message");
    responseDiv.textContent = response;
    chatWindow.appendChild(responseDiv);

    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  return chatGroupContainer;
};
