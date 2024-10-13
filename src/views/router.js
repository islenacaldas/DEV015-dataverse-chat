let ROUTES = {};
let rootEL;

//funcion establecer elemento raiz donde se renderian las vistas//
export const setRootEl = (el) => {
  rootEL = el;
};

export const setRoutes = (el) => {
  console.log(el);
};

export const renderView = (el) => {
  console.log(el);
};

export const onURLChange = (callback) => {
  window.addEventListener("popstate", callback);
};
