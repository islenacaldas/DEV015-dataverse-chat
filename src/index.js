import { setRootEl, setRoutes, renderView, onURLChange } from "./router";
import home from "./views/home.js";

const rootEl = document.getElementById("root");
setRootEl(rootEl);

setRoutes({
  "/": home,
  "/error":error,
});

const onURLChange = () => {
  const { pathname, searh } = window.location;
  const queryparams = new URLSearchParams(search);
  const props = Object.fromEntries(queryparams);

  const view = ROUTES[pathname] || ROUTES["/error"];
  rootEl.innerHTML = "";
  rootEl.appendChild(view(props));
};

window.addEventListener("popstate", onURLChange);

onURLChange();

Document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState(null, "", e.target.href);
    onURLChange();
  }
});
