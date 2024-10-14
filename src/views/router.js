let rootEl;
let routes = {};
// Función para establecer el elemento raíz donde se renderizarán las vistas
export const setRootEl = (el) => {
  rootEl = el;
};

export const setRoutes = (r) => {
  routes = r;
};

export const renderView = (path) => {
  const view = routes[path] || routes["/"];
  rootEl.innerHTML = "";
  rootEl.appendChild(view());
};

export const onURLChange = (callback) => {
  window.addEventListener('popstate', () => {
    callback(window.location.pathname);
  });

  // También manejamos el cambio inicial de URL
  callback(window.location.pathname);
};
