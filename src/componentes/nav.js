import { navigationTo } from "../router.js";
export const nav = () => {
  //creacion del evento nav
  const navContainer = document.createElement("div");
  navContainer.classList.add("nav");

  //muestra en el html el nav
  navContainer.innerHTML = `
<div class="nav_logo">
<!--<img class="nav_logo_img" src="./logos/logo.svg" alt="dataverse"/>-->
<span class="nav_logo_emoji"> 🚀</span>
<h2>Inventos Revolucionarios</h2>
</div>

<div class="nav_chat">
<button class="nav_chat_btn">Chat grupal</button>
<button class="nav_chatIn_btn">Chat individual</button>
<button class="nav_api_btn">API</button>
</div>
`;
  //agrega los eventos a los botones
  navContainer.querySelector(".nav_logo").addEventListener("click", () => {
    navigationTo("/");
  });

  navContainer.querySelector(".nav_chat_btn").addEventListener("click", () => {
    navigationTo("/chatGrupal");
  });
  navContainer.querySelector(".nav_chatIn_btn").addEventListener("click", () => {
    navigationTo("/chatIndividual");
  });

  navContainer.querySelector(".nav_api_btn").addEventListener("click", () => {
    navigationTo("/api");
  });

  return navContainer;
};
