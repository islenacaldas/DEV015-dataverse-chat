export function home(props) {
  const viewEl = document.createElement("div");
  viewEl.textContent = `<h1>bienvenido a la pagina de inicio ${
    props.name ? props.name : ""}</h1>`;
  return viewEl;
}
   