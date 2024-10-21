let ROUTES = {};
let rootEl;

export const setRootEl = (el) => {
  rootEl = el;
};

export function setRoutes(routes) {
  if (typeof routes !== "object") {
    throw new Error("Routes debe ser un objeto");
  }
  if (!routes["/error"]) {
    throw new Error("Debe definirse una ruta/error");
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
  rootEl.innerHTML = ROUTES[pathname] || ROUTES["/error"];
  const viewElement = view(props);
  rootEl.appendchild(viewElement);
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
