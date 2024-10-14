let rootEl;
let routes = {};
// Función para establecer el elemento raíz donde se renderizarán las vistas
export const setRootEl = (el) => {
  rootEl = el;
};

export const setRoutes = (r) => {
  routes = r;
};

export const renderView = (pathname, props= {}) => {
  const view = routes[pathname] || routes["/error"];
  rootEl.innerHTML = "";
  rootEl.appendChild(view(props));
};

export const onURLChange = (callback) => {
  window.addEventListener('popstate', (event) => {
    callback(window.location.pathname, event.state);
  });
};

export function navigateTo(pathname, props = {}) {
  window.history.pushState(props, "", pathname);
  renderView(pathname, props);
}

const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params);
};