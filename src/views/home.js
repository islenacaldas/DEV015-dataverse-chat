import { renderItems } from "/path/to/renderItems.js";
import { data } from "../data/dataset.js";
import { navigateTo } from "./router.js";

export function Home(props) {
  const viewEl = document.createElement("div");
  viewEl.innerHTML = `
    <h1>Bienvenido a Dataverse, ${props.name || "Visitante"}!</h1>
    <nav>
      <ul>
        <li><a href="/about">Acerca de</a></li>
        <li><a href="/chat-individual">Chat Individual</a></li>
        <li><a href="/chat-grupal">Chat Grupal</a></li>
      </ul>
    </nav>
    <button id="about-button">Ir a Acerca de</button>
  `;
  const itemList = renderItems(data);

  return viewEl.appendChild(itemList);
}
