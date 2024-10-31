import { nav } from "./nav.js";

export const header = () => {
  //se crea el elemento header
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header");

  //se define la estructura de como se ve el header
  headerContainer.innerHTML = `
  <div class="header_section">
  <h2 class= "header_title">Explora los inventos que revolucionaron el mundo</h2>
  <p class="header_section_introduction">
    descrube los inventos revolucionarios que han hecho al mundo cambiar, impactos que hasta el dia de hoy podemos evidenciar. 
   podras filtrar por años de invension, lugar de su creacion y % de inventos creados por pais.
   diviertete explorando el mundo!. 
  </p>
  </div>`;

  headerContainer.appendChild(nav(), headerContainer.firstChild);
  return headerContainer;
};
