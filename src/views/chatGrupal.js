import { sendMessage } from "../lib/apiOpenAi.js";
import data from "../data/dataset.js";


export const chatGrupal = () => {

  const chatGroupContainer = document.createElement("div");
  chatGroupContainer.classList.add("chat-group");

  // Añadimos los componentes a la vista
  const mainElement = document.createElement("main");
  mainElement.classList.add("chat-group-main");
  chatGroupContainer.appendChild(mainElement);

  // Establecemos la estructura del main element
  const chatGroup = document.createElement("div");
  chatGroup.classList.add("group-container");
  mainElement.appendChild(chatGroup);

  // Cambiamos el título y el favicon 
  document.title = "Chat Grupal";

  // Contenedor de logos tecnológicos
  const logoTecnological = document.createElement("div");
  logoTecnological.classList.add("logo-tecnological");
  chatGroup.appendChild(logoTecnological);
  const imageLogo = document.createElement("div");
  imageLogo.classList.add("image-logo");
  logoTecnological.appendChild(imageLogo);

  // Selecciona solo los primeros 10 elementos del array
  const dataLimitada = data.slice(0, 10);

  dataLimitada.forEach((objeto) => {
    const logoTech = document.createElement("img");
    logoTech.classList.add("image-logo-tech");
    logoTech.src = objeto.imageUrl;
    logoTech.alt = objeto.name;
    imageLogo.appendChild(logoTech);
  });

  // Crear un contenedor de detalles de logo
  const details = document.createElement("div");
  details.classList.add("details-logo");
  details.innerHTML = `
    <h2>Chat grupal de Inventos</h2>
    <p>¡Bienvenida al Chat Grupal de Inventos que cambiaron el mundo! 🚀 Conecta y aprende con 26 Inventosen tiempo real. 🌟</p>
  `;
  logoTecnological.appendChild(details);

  // Contenedor de chat
  const chatWindow = document.createElement("div");
  chatWindow.classList.add("chat-tecnologic");
  chatGroup.appendChild(chatWindow);

  // Formulario de chat
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

  // Crear una función para enviar el mensaje a todos los inventores
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value;
    userInput.value = "";

    // Mostrar mensaje del usuario
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.textContent = message;
    chatWindow.appendChild(userMessageDiv);

    // Enviar el mensaje a todos los inventores
    for (const invento of data) {
      const response = await sendMessage(`${invento.name}, ${message}`);
      const responseDiv = document.createElement("div");
      responseDiv.classList.add("response-message");
      responseDiv.textContent = `${invento.name}: ${response}`;
      chatWindow.appendChild(responseDiv);
    }

    // Mantener el scroll al final
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });

  chatGroup.appendChild(chatForm);

  // Vista lateral con usuarios
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

  return chatGroupContainer;
};
