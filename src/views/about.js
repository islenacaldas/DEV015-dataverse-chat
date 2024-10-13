export default function About() {
  const element = document.createElement('div');
  element.className = 'about-view';

  const title = document.createElement('h1');
  title.textContent = 'Acerca de Dataverse';
  element.appendChild(title);

  const content = document.createElement('p');
  content.textContent = 'Esta es la página de información sobre Dataverse.';
  element.appendChild(content);

  return element;
}
