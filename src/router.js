import { header } from "./componentes/header.js";
import { footer } from "./componentes/footer.js";
let ROUTES = {};
let rootEl;

export const setRootEl = (el) => {
  rootEl = el;
};

export function setRoutes(routes) {
  if (typeof routes !== "object") {
    throw new Error("Routes debe ser un objeto");
  }
  if (typeof routes["/error"] !== "function") {
    throw new Error("Debe definirse una función para la ruta /error");
  }
  ROUTES = routes;
}

const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  const obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
};

function renderView(route, props) {
  const view = ROUTES[route];
  if (view) {
    console.log("Rendering view:", view);
    const viewElement = view(props);
    if (!rootEl) {
      console.error("Root element not set. Call setRootEl first.");
      return;
    }
    rootEl.innerHTML = "";
    rootEl.appendChild(header()); //esto me deja ver mi menu de navegacion en todas y cada una de las paginas.
    rootEl.appendChild(viewElement);
    rootEl.appendChild(footer());
  } else {
    if (ROUTES["/error"]) {
      renderView("/error", { errorMessage: "Route not found" });
    }
  }
}

export const navigationTo = (pathname, props = {}) => {
  if (props.id && pathname === "/chatIndividual") {
    window.history.pushState({}, null, pathname + "?id=" + props.id);
  } else {
    window.history.pushState({}, null, pathname);
  }

  renderView(pathname, props);
};

export const onURLChange = (location = window.location) => {
  const { pathname, search } = location;
  const queryparams = queryStringToObject(search);
  renderView(pathname, queryparams);
};