export default function About(props) {
  const element = document.createElement('div');
  element.innerHTML = `
    <h1>Acerca de Dataverse</h1>
    <p>Esta es la página de información sobre Dataverse.</p>
    <p>Bienvenido, ${props.name || 'Visitante'}!</p>
    <a href="/">Volver al inicio</a>
  `;
  return element;
}
