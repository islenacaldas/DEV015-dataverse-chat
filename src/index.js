import Home from "./views/home.js";
import About from "./views/about.js";
import { setRootEl, setRoutes, renderView, onURLChange, navigateTo } from "./views/router.js";
import { chatGrupal } from "./views/chatGrupal.js";
import { chatIndividual } from "./views/chatIndividual.js";
import ErrorView from "./views/error.js";

window.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  setRootEl(rootEl);

  const routes = {
    "/": Home,
    "/about": About,
    "/chat-individual": chatIndividual,
    "/chat-grupal": chatGrupal,
    "/error": ErrorView
  };

  setRoutes(routes);

  function handleNavigation(e) {
    if (e.target.matches("nav a")) {
      e.preventDefault();
      const path = new URL(e.target.href).pathname;
      navigateTo(path);
    }
  }

  document.body.addEventListener("click", handleNavigation);

  onURLChange((pathname, state) => {
    const searchParams = new URLSearchParams(window.location.search);
    const props = {
      ...state,
      ...Object.fromEntries(searchParams)
    };
    renderView(pathname, props);
  });

  // Manejar la carga inicial de la URL
  const searchParams = new URLSearchParams(window.location.search);
  const initialProps = Object.fromEntries(searchParams);
  renderView(window.location.pathname, initialProps);
});

// Handle URL changes
window.addEventListener('popstate', ({state}) => {
  onURLChange(window.location.pathname, state);
});
