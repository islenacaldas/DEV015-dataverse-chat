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
    rootEl.innerHTML = '';
    rootEl.appendChild(viewElement);
  } else {
    console.error("Route not found:", route);
    if (ROUTES["/error"]) {
      renderView("/error", { errorMessage: "Route not found" });
    }
  }
}

export const navigationTo = (pathname, props = {}) => {
  window.history.pushState({}, null, pathname);
  renderView(pathname, props);
};

export const onURLChange = (location = window.location) => {
  const { pathname, search } = location;
  const queryparams = queryStringToObject(search);
  renderView(pathname, queryparams);
};
