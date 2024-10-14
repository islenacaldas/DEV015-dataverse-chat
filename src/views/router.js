let rootEl;
let routes;

export function setRootEl(el) {
  rootEl = el;
}

export function setRoutes(routeObj) {
  routes = routeObj;
}

export function renderView(pathname, props = {}) {
  const view = routes[pathname] || routes["/error"];
  rootEl.innerHTML = "";
  rootEl.appendChild(view(props));
}

export function onURLChange(callback) {
  window.addEventListener("popstate", (event) => {
    callback(window.location.pathname, event.state);
  });
}

export function navigateTo(pathname, props = {}) {
  window.history.pushState(props, "", pathname);
  renderView(pathname, props);
}

const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params);
};
