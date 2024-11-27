import { navigationTo } from "../router.js";
import data from "../data/dataset.js";
import { getElementDataById } from "../lib/dataFunction.js";
import { sendMessage } from "../lib/apiOpenAi.js"; // Asegúrate de usar la función para interactuar con Groq

export function chatIndividual(props) {
  const chatView = document.createElement("div");
  chatView.classList.add("chat-individual");

  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  if (id === null) {
    id = props.id;
  }
 
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
  const conversation = [];

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = chatInput.value;

    if (message) {
      // Generar el prompt inicial basado en el personaje
      const personaPrompt =
        elementData.personaPrompt ||
        `Actúa como el inventor de ${elementData.name}, y recuerda que ${elementData.context}.`;

      console.log(personaPrompt);

      // Agregar el prompt del sistema si es el inicio de la conversación
      if (conversation.length === 0) {
        conversation.push({ role: "system", content: personaPrompt });
      }

      // Agregar el mensaje del usuario al historial
      conversation.push({ role: "user", content: message });

      try {
        // Enviar la conversación al servicio Groq
        const response = await sendMessage(conversation);

        // Limpiar la entrada y actualizar el chat
        chatInput.value = "";
        chatWindow.innerHTML = "";

        response.forEach((item) => {
          if (item.role !== "system") {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add(`${item.role}-message`);
            messageDiv.textContent = `${item.role}: ${item.content}`;
            chatWindow.appendChild(messageDiv);
          }
        });

        // Mantén el scroll en la parte inferior
        chatWindow.scrollTop = chatWindow.scrollHeight;
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        chatWindow.innerHTML +=
          "<p class='error-message'>Error al procesar la solicitud.</p>";
      }
    }
  });

  backButton.addEventListener("click", () => {
    navigationTo("/");
  });

  return chatView;
}