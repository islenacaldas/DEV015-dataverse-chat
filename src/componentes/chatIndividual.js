import { navigationTo } from "../router.js";
import data from "../data/dataset.js";
import { getElementDataById } from "../lib/dataFunction.js";
import { getApiKey } from "../lib/apiKey.js";
import { sendMessage } from "../lib/apiOpenAi.js";

export function chatIndividual(props) {
  const chatView = document.createElement("div");
  chatView.classList.add("chat-individual");

  //extraer el id del elemento desde props o desde search params
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  //obtener los datos del elemento
  const elementData = getElementDataById(data, id);
  chatView.innerHTML = `
    <h1>Chat con ${elementData.name}</h1>
    <div class="chat-window">
    <div>
    <form class="chat-form">
    <input type="text" id="chat-input" placeholder="Escribe tu mensaje"/>
    <button type="submit">Enviar</button>
    </form>
    <button id="back-button">Volver</button>
    </div>
    </div>
    `;
  const chatForm = chatView.querySelector(".chat-form");
  const chatInput = chatView.querySelector("#chat-input");
  const chatWindow = chatView.querySelector(".chat-window");
  const backButton = chatView.querySelector("#back-button");

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = chatInput.value;
    if (message) {
      //agregar la logica para enviar el mensaje
      const response = await sendMessage(id, message);
      chatInput.value = "";
      //agregar el mensaje a la ventana del chat
      const messageElement = document.createElement("div");
      messageElement.textContent = `tu: ${message}`;
      chatWindow.appendChild(messageElement);

      //mostrar la repsuesta de la api
      const responseElement = document.createElement("div");
      responseElement.textContent = `Respuesta: ${response}`;
      chatWindow.appendChild(responseElement);
    }
    backButton.addEventListener("click", () => {
      navigationTo("/");
    });
  });
  return chatView;
}

console.log(chatIndividual());