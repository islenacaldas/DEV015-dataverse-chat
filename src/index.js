import { setRootEl, setRoutes, renderView, onURLChange, navigationTo } from "./router";
import home from "./views/home.js";
import error from "./views/error.js";

const rootEl = document.getElementById("root");
setRootEl(rootEl);

setRoutes({
  "/": home,
  "/error": error,
});

window.addEventListener("popstate", onURLChange);

onURLChange();

Document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState(null, "", e.target.href);
    onURLChange();
  }
});
