export function chatIndividual(props) {
  const element = document.createElement('div');
  element.innerHTML = `
    <h1>Chat Individual</h1>
    <p>Aquí puedes iniciar un chat individual.</p>
    <a href="/">Volver al inicio</a>
  `;
  return element;
}
