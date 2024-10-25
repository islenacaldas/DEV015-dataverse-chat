import {
  setRootEl,
  setRoutes,
  onURLChange,
  navigationTo,
} from "../src/router.js";
import { home } from "./views/home.js";
import { about } from "./views/about.js";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");

  if (!rootEl) {
    console.error("No se encontró el elemento root");
    return;
  }

  setRootEl(rootEl);

  setRoutes({
    "/": home,
    "/about": about,
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
