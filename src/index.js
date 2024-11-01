import { setRootEl, setRoutes, onURLChange, navigationTo } from "./router.js";
import { home } from "./views/home.js";
import {} from "./views/chatGrupal.js";

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
    //"/chat-grupal": chatGrupal,
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

  // Renderiza la vista inicial
  onURLChange();
});
