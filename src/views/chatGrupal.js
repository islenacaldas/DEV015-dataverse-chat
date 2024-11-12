import { nav } from "../componentes/nav.js";
import  data  from "../data/dataset.js";

export function chatGrupal() {
  const viewGroup = document.createElement("div");
  viewGroup.classList.add("chat_group");

  viewGroup.appendChild(nav());
  const mainElement = document.createElement("main");
  mainElement.classList.add("chat_group_main");
  viewGroup.appendchild(mainElement);

  const chatGroup = document.createElement("div");
  chatGroup.classList.add("chat_group");
  mainElement.appendChild(chatGroup);

}
