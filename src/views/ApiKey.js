import { navigationTo } from "../router.js";
import { setApiKey, getApiKey } from "../lib/apiKey.js";

export function apiKey() {
  const apiKeyView = document.createElement("div");
  apiKeyView.classList.add("apiKey");

  //document.title = "Api Key";

  // Se desarrolla la estructura de la vista
  apiKeyView.innerHTML = `
    <div class="containerForm">
      <div class="containerForm_logo"></div>
      <h1 class="containerForm">Inventos que revolucionaron el mundo</h1>
      <p class="containerFormDescription">Conversa con tu inventor preferido. Ingresa tu ApiKey y descubre más sobre este fascinante mundo.</p>
      <label for="apiKey" class="apiKeyLabel">Api Key</label>
      <input type="password" id="apiKey" class="apiKeyInput" placeholder="Ingresa tu ApiKey" required/>
      <div class="containerFormButtons">
        <button id="button_clear">Borrar</button>
        <button id="button_save">Guardar</button>
      </div>
      <button id="button_back">Volver</button>
      <div class="containerForm_link">¿No tienes una ApiKey?
        <a class="containerForm_link" href="https://platform.openai.com/settings/profile/user" target="_blank">Crea tu ApiKey</a>
      </div>
      <span></span>
    </div>
  `;

  const apiKeyInput = apiKeyView.querySelector("#apiKey");
  const buttonClear = apiKeyView.querySelector("#button_clear");
  const buttonSave = apiKeyView.querySelector("#button_save");
  const buttonBack = apiKeyView.querySelector("#button_back");
  const containerForm = apiKeyView.querySelector(".containerForm");
  const inputMessage = apiKeyView.querySelector("span");
  inputMessage.classList.add("inputMessage");
  containerForm.insertBefore(inputMessage, apiKeyInput);

  let APIKEY;
  APIKEY = getApiKey();
  if (APIKEY) {
    const maskedApiKey = APIKEY;
    apiKeyInput.value = maskedApiKey;
  }

  buttonSave.addEventListener("click", () => {
    APIKEY = apiKeyInput.value;
    if (APIKEY.length >= 10) {
      setApiKey(APIKEY);
      const maskedApiKey = APIKEY.slice(0, 5) + "******" + APIKEY.slice(-5);
      apiKeyInput.value = maskedApiKey;
      inputMessage.innerHTML = "Api Key guardada";
    } else {
      inputMessage.innerHTML = "La ApiKey debe tener al menos 10 caracteres";
    }
  });

  buttonBack.addEventListener("click", () => {
    navigationTo("/");
  });

  buttonClear.addEventListener("click", () => {
    localStorage.removeItem("apiKey");
    apiKeyInput.value = "";
    inputMessage.innerHTML = "Api Key borrada";
  });

  return apiKeyView;
}
