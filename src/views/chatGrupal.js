export function chatGrupal(props) {
  const element = document.createElement('div');
  element.innerHTML = `
    <h1>Chat Grupal</h1>
    <p>Aquí puedes unirte a un chat grupal.</p>
    <a href="/">Volver al inicio</a>
  `;
  return element;
}
