import { setRootEl, setRoutes, onURLChange, navigationTo } from "./router.js";
import { home } from "./views/home.js";
import { chatIndividual } from "./componentes/chatIndividual.js";
import {chatGrupal} from "./views/chatGrupal.js";
import { apiKey } from "./views/ApiKey.js";


function displayResponses(responses) {
  const responseContainer = document.getElementById("response-container");
  if (!responseContainer) return;

  responses.forEach(({ name, response }) => {
    const responseEl = document.createElement("div");
    responseEl.textContent = `${name}: ${response}`;
    responseContainer.appendChild(responseEl);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");

  if (!rootEl) {
    console.error("No se encontró el elemento root");
    return;
  }

  const title = document.createElement("h1");
  title.textContent = "Inventos que cambiaron el mundo";
  title.classList.add("page-title");
  setRootEl(rootEl);

  setRoutes({
    "/": home,
    "/api": apiKey,
    "/chatIndividual": chatIndividual,
    "/chatGrupal": chatGrupal,
    "/error": (props) => {
      const el = document.createElement("div");
      el.textContent = props.errorMessage || "An error occurred";
      return el;
    },
    // Otras rutas aquí
  });

  window.addEventListener("popstate", onURLChange);

  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigationTo(e.target.getAttribute("href"));
    }
  });

  onURLChange();
});

