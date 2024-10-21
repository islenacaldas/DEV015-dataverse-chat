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

export const renderView = (pathname, props = {}) => {
  rootEl.innerHTML = ''; // Limpia el contenido existente
  const view = ROUTES[pathname] || ROUTES["/error"];
  if (typeof view === 'function') {
    const viewElement = view(props);
    rootEl.appendChild(viewElement);
  } else {
    console.error('La vista no es una función:', pathname);
  }
};


export const navigationTo = (pathname, props = {}) => {
  window.history.pushState({}, null, pathname);
  renderView(pathname, props);
};

export const onURLChange = (location = window.location) => {
  const { pathname, search } = location;
  const queryparams = queryStringToObject(search);
  renderView(pathname, queryparams);
};
