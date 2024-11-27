import { sendMessage } from "../lib/apiOpenAi.js"; // Usar la función para interactuar con Groq
import data from "../data/dataset.js";

export const chatGrupal = () => {
  const chatGroupContainer = document.createElement("div");
  chatGroupContainer.classList.add("chat-group");

  // Añadimos los componentes a la vista
  const mainElement = document.createElement("main");
  mainElement.classList.add("chat-group-main");
  chatGroupContainer.appendChild(mainElement);

  // Estructura principal
  const chatGroup = document.createElement("div");
  chatGroup.classList.add("group-container");
  mainElement.appendChild(chatGroup);

  // Cambiar título y favicon
  document.title = "Chat Grupal";

  // Contenedor de logos tecnológicos
  const logoTecnological = document.createElement("div");
  logoTecnological.classList.add("logo-tecnological");
  chatGroup.appendChild(logoTecnological);
  const imageLogo = document.createElement("div");
  imageLogo.classList.add("image-logo");
  logoTecnological.appendChild(imageLogo);

  // Selección de logos
  const dataLimitada = data.slice(0, 10);
  dataLimitada.forEach((objeto) => {
    const logoTech = document.createElement("img");
    logoTech.classList.add("image-logo-tech");
    logoTech.src = objeto.imageUrl;
    logoTech.alt = objeto.name;
    imageLogo.appendChild(logoTech);
  });

  // Detalles del chat grupal
  const details = document.createElement("div");
  details.classList.add("details-logo");
  details.innerHTML = `
    <h2>Chat grupal de Inventos</h2>
    <p>¡Bienvenida al Chat Grupal de Inventos que cambiaron el mundo! 🚀 Conecta y aprende con 26 inventores en tiempo real. 🌟</p>
  `;
  logoTecnological.appendChild(details);

  // Contenedor de mensajes
  const chatWindow = document.createElement("div");
  chatWindow.classList.add("chat-tecnologic");
  chatGroup.appendChild(chatWindow);

  // Formulario para enviar mensajes
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

  chatGroup.appendChild(chatForm);

  // Vista lateral con los inventores
  const ulInventors = document.createElement("ul");
  ulInventors.classList.add("technologies");
  mainElement.appendChild(ulInventors);

  data.forEach((objeto) => {
    const liInventors = document.createElement("li");
    liInventors.classList.add("technologies-info");

    liInventors.innerHTML = `
      <h3>${objeto.name}</h3>
      <p>${objeto.shortDescription}</p>
    `;
    ulInventors.appendChild(liInventors);
  });

  // Manejo de las conversaciones grupales
  const conversations = {};

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value;
    userInput.value = "";

    // Mostrar mensaje del usuario
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.textContent = `Tú: ${message}`;
    chatWindow.appendChild(userMessageDiv);

    // Inicializar conversaciones si no están creadas
    data.forEach((invento) => {
      if (!conversations[invento.name]) {
        const personaPrompt = `Actúa como el inventor de ${invento.name}. Siempre responde basado en este contexto: "${invento.context}".`;
        conversations[invento.name] = [
          { role: "system", content: personaPrompt },
        ];
      }

      // Agregar el mensaje del usuario al historial del inventor
      conversations[invento.name].push({ role: "user", content: message });
    });

    // Enviar mensajes a cada inventor
    for (const invento of data) {
      try {
        const response = await sendMessage(conversations[invento.name]);

        if (response && response.length > 0) {
          // Filtrar para no mostrar mensajes de tipo "system"
          response.forEach((item) => {
            if (item.role !== "system") {
              // Agregar la respuesta al historial del inventor
              conversations[invento.name].push({
                role: item.role,
                content: item.content,
              });

              // Mostrar la respuesta en el chat
              const responseDiv = document.createElement("div");
              responseDiv.classList.add(`${item.role}-message`);
              responseDiv.textContent = `${invento.name}: ${item.content}`;
              chatWindow.appendChild(responseDiv);
            }
          });
        }
      } catch (error) {
        console.error(`Error al enviar mensaje a ${invento.name}:`, error);

        // Mostrar un mensaje de error
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error-message");
        errorDiv.textContent = `${invento.name}: No se pudo obtener respuesta.`;
        chatWindow.appendChild(errorDiv);
      }
    }

    // Mantener el scroll al final
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });

  return chatGroupContainer;
};
