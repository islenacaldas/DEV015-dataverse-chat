let ROUTES = {};  // Almacenará todas las rutas de la aplicación
let rootEl;       // Almacenará el elemento DOM raíz donde se renderizará todo

// Función para establecer el elemento raíz
export const setRootEl = (el) => {
  rootEl = el;  // Guarda el elemento DOM que servirá como contenedor principal
};

// Función para establecer las rutas disponibles
export function setRoutes(routes) {
  ROUTES = routes;  // Guarda el objeto con todas las rutas de la aplicación
}

// Función que convierte parámetros de URL en un objeto
const queryStringToObject = (queryString) => {
  // Crea un objeto URLSearchParams con los parámetros de la URL
  const params = new URLSearchParams(queryString);
  // Convierte los parámetros en un objeto JavaScript
  const pramsObjetc = Object.fromEntries(params);
  return pramsObjetc;
};

// Función que renderiza una vista específica
const renderView = (pathname, props) => {
  rootEl.innerHTML = "";  // Limpia el contenido actual
  const RenderViews = ROUTES[pathname];  // Obtiene la función de renderizado para la ruta

  if (RenderViews) {  // Si existe la ruta
    // Ejecuta la función de renderizado y obtiene la vista y sus eventos
    const { view, getElementsAndEvents } = RenderViews(props);
    rootEl.appendChild(view);  // Añade la vista al DOM
    getElementsAndEvents();    // Inicializa los eventos de la vista
  } else {
    navigationTo("/404");  // Si la ruta no existe, redirige a 404
  }
};

// Función para navegar a una nueva ruta
export const navigationTo = (pathname, props = {}) => {
  // Construye la cadena de consulta si hay propiedades
  const queryString = Object.keys(props).length
    ? `?${new URLSearchParams(props)}`  // Si hay props, crea la cadena de consulta
    : "";  // Si no hay props, cadena vacía

  // Construye la URL completa
  const url = `${window.location.origin}${pathname}${queryString}`;
  // Actualiza la historia del navegador
  window.history.pushState({}, "", url);
  // Renderiza la nueva vista
  renderView(pathname, props);
};

// Función que maneja los cambios en la URL
export const onUrlChange = () => {
  // Obtiene la ruta y los parámetros de la URL actual
  const { pathname, search } = window.location;
  // Convierte los parámetros de la URL en un objeto
  const props = queryStringToObject(search);
  // Renderiza la vista correspondiente
  renderView(pathname, props);
};
