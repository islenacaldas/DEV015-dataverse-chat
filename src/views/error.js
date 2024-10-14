export default function ErrorView() {
  const element = document.createElement('div');
  element.innerHTML = `
    <h1>Error 404</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <a href="/">Volver al inicio</a>
  `;
  return element;
}
