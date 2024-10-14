import { setRootEl, setRoutes, renderView } from "./views/router";
import Home from "./views/home.js";
import About from "./views/about.js";
import { chatGrupal } from "./views/chatGrupal.js";
import { chatIndividual } from "./views/chatIndividual.js";

const rootEl = document.getElementById("root");

setRootEl(rootEl);

const routes = {
  "/": Home,
  "/about": About,
  "/chat-individual": chatIndividual,
  "/chat-grupal": chatGrupal,
};

setRoutes(routes);

// Función para manejar la navegación
function handleNavigation(e) {
  if (e.target.matches("nav a")) {
    e.preventDefault();
    const path = new URL(e.target.href).pathname;
    window.history.pushState({}, "", path);
    renderView(path);
  }
}

// Evento para manejar clics en los enlaces de navegación
document.body.addEventListener("click", handleNavigation);

// Usar onURLChange para manejar cambios en la URL, incluyendo los botones de avance/retroceso
onURLChange((path) => {
  renderView(path);
});
