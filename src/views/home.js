import data from "../data/dataset.js";
import { filterByYear } from "../lib/dataFunction.js";

export const home = () => {
  const viewEl = document.createElement("div");
  viewEl.className = "home";

  const renderItems = (data) => {
    const ul = document.createElement("ul");
    data.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <div>
       <img src="${item.extraInfo.imageSource}" alt="${item.name}" style="width:100px;">
      <h3>${item.name}</h3> 
      <p>${item.shortDescription}</p> 
      <p>${item.description} </p>
      <p>${item.facts.yearOfEvent} </p>
      <p>${item.facts.location} </p>
      <p>${item.facts.impact}</p>
      </div>
      `;
      ul.appendChild(li);
    });
    return ul;
  };

  const title = document.createElement("h1");
  title.textContent = "Invnentos que cambiaron al mundo";
  viewEl.appendChild(title);

  const yearFilter = createFilter("filtrar por año:", getUniqueYears(data));



  viewEl.appendChild(yearFilter);



  const container = document.createElement("div");
  container.id = "container";
  viewEl.appendChild(container);

  const statsDisplay = document.createElement("div");
  statsDisplay.id = "stats-display";
  viewEl.appendChild(statsDisplay);

  // Función para actualizar la visualización
  function updateDisplay(dataToDisplay) {
    container.innerHTML = "";
    statsDisplay.innerHTML = "";
    container.appendChild(renderItems(dataToDisplay));
  }

  // Inicialización
  updateDisplay(data);

  // Aquí puedes agregar más funcionalidades como filtros, ordenamiento, etc.

  return viewEl;
};
