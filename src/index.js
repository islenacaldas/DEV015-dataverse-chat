import Home from "./views/home.js";
import About from "./views/about.js";
import { setRootEl, setRoutes, renderView, onURLChange } from "./views/router";
import { chatGrupal } from "./views/chatGrupal.js";
import { chatIndividual } from "./views/chatIndividual.js";
import { ErroView } from "./views/erroView.js";

window.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  setRootEl(rootEl);

  const routes = {
    "/": Home,
    "/about": About,
    "/chat-individual": chatIndividual,
    "/chat-grupal": chatGrupal,
    "/error": ErrorView,
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
  onURLChange((pathname, state) => {
    const searchParams = new URLSearchParams(window.location.search);
    const props = {
      ...state,
      ...Object.fromEntries(searchParams),
    };
    renderView(pathname, props);
  });

  const searchParams = new URLSearchParams(window.location.search);
  const initialProps = Object.fromEntries(searchParams.entries());
  renderView(window.location.pathname, initialProps);
});

window.addEventListener("popstate", ({state}) => {
onURLChange(window.location.pathname, state)});
