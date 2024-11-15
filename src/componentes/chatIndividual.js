import { navigationTo } from "../router.js";
import data from "../data/dataset.js";
import { getElementDataById } from "../lib/dataFunction.js";
import { sendMessage } from "../lib/apiOpenAi.js";

export function chatIndividual() {
  const chatView = document.createElement("div");
  chatView.classList.add("chat-individual");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const elementData = getElementDataById(data, id);
  if (!elementData) {
    chatView.innerHTML = "<p>Inventor no encontrado</p>";
    return chatView;
  }

  chatView.innerHTML = `
    <h1>Chat con ${elementData.name}</h1>
    <div class="chat-window"></div>
    <form class="chat-form">
      <input type="text" id="chat-input" placeholder="Escribe tu mensaje" required />
      <button type="submit">Enviar</button>
    </form>
    <button id="back-button">Volver</button>
  `;

  const chatForm = chatView.querySelector(".chat-form");
  const chatInput = chatView.querySelector("#chat-input");
  const chatWindow = chatView.querySelector(".chat-window");
  const backButton = chatView.querySelector("#back-button");

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = chatInput.value;
    if (message) {
      const response = await sendMessage(message);
      chatInput.value = "";

      const userMessageDiv = document.createElement("div");
      userMessageDiv.classList.add("user-message");
      userMessageDiv.textContent = `Tú: ${message}`;
      chatWindow.appendChild(userMessageDiv);

      const responseDiv = document.createElement("div");
      responseDiv.classList.add("response-message");
      responseDiv.textContent = `Respuesta: ${response}`;
      chatWindow.appendChild(responseDiv);

      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  });

  backButton.addEventListener("click", () => {
    navigationTo("/");
  });

  return chatView;
}
