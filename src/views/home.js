import { renderItems } from "./renderItems";
import { data } from "../data/dataset.js";
import { navigateTo } from "./router.js"; 

export default function Home(props) {
  const element = document.createElement('div');
  element.innerHTML = `
    <h1>Bienvenido a Dataverse, ${props.name || 'Visitante'}!</h1>
    <nav>
      <ul>
        <li><a href="/about">Acerca de</a></li>
        <li><a href="/chat-individual">Chat Individual</a></li>
        <li><a href="/chat-grupal">Chat Grupal</a></li>
      </ul>
    </nav>
    <button id="about-button">Ir a Acerca de</button>
  `;

  element.querySelector('#about-button').addEventListener('click', () => {
    navigateTo("/about", { name: "Xochitl" });
  });

  return element;
}



