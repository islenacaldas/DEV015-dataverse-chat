let ROUTES = {};
let rootEL;

//funcion establecer elemento raiz donde se renderian las vistas//
export const setRootEl = (el) => {
  rootEL = el;
};

export const setRoutes = (r) => {
  ROUTES = r;
};

export const renderView = (path) => {
  const view = ROUTES[path] || ROUTES["/"];
  rootEL.innerHTML = "";
  rootEL.appendChild(view());
};

export const onURLChange = (callback) => {
  const handleURLChange = () => {
    const path = window.addEventListener("popstate", callback);
  };
  window.addEventListener("popstate", handleURLChange);

  handleURLChange();
};
