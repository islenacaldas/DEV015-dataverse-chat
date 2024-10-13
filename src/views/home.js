import { renderItems } from "./renderItems";
import { data } from "../data/dataset.js";

export default function home() {
  const element = document.createElement("div");
  element.className = "home-view";

  const title = document.createElement("div");
  title.textContent = "Bienvenida a Dataverse";
  element.appendChild(title);

  element.appendChild(renderItems(data))

  return element;
}
