import data from "../data/dataset.js";
import {
  processData,
  clearAllFilters,
  computeStats,
} from "../lib/dataFunction.js";

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
       <p>${item.facts.yearOfEvent} </p>
       <p>${item.facts.location} </p>
      <p>${item.shortDescription}</p> 
      <p>${item.description} </p>
      <p>${item.facts.impact}</p>
      </div>
      `;
      ul.appendChild(li);
    });
    return ul;
  };

  const title = document.createElement("h1");
  title.textContent = "Inventos que cambiaron el mundo";
  title.classList.add("page-title");
  viewEl.appendChild(title);

  // Creación de los filtros
  const yearFilter = createFilter("Filtrar por año:", getUniqueYears(data));
  const locationFilter = createFilter(
    "Filtrar por país:",
    getUniqueLocations(data)
  );
  const yearSort = createSort("Ordenar por año:");
  const locationSort = createSort("Ordenar por ubicación:");

  viewEl.appendChild(yearFilter);
  viewEl.appendChild(locationFilter);
  viewEl.appendChild(yearSort);
  viewEl.appendChild(locationSort);

  const clearButton = document.createElement("button");
  clearButton.textContent = "Limpiar filtros";
  viewEl.appendChild(clearButton);

  const statsButton = document.createElement("button");
  statsButton.textContent = "Mostrar estadísticas";
  viewEl.appendChild(statsButton);

  const container = document.createElement("div");
  container.id = "container";
  viewEl.appendChild(container);

  const statsDisplay = document.createElement("div");
  statsDisplay.id = "stats-display";
  viewEl.appendChild(statsDisplay);

  // Función para actualizar la visualización
  function updateDisplay(result) {
    container.innerHTML = "";
    statsDisplay.innerHTML = "";
    container.appendChild(renderItems(result.processedData));
  }

  // Función para aplicar filtros y ordenamiento
  function applyFiltersAndSort() {
    const options = {
      year: yearFilter.value,
      location: locationFilter.value,
      sortBy: yearSort.value ? "year" : locationSort.value ? "location" : "",
      sortOrder: yearSort.value || locationSort.value,
    };

    console.log("Opciones aplicadas:", options);
    const result = processData(data, options);
    updateDisplay(result);
  }

  // Event listeners para los filtros
  yearFilter.addEventListener("change", applyFiltersAndSort);
  locationFilter.addEventListener("change", applyFiltersAndSort);

  // Event listener para ordenamiento por año
  yearSort.addEventListener("change", () => {
    locationSort.value = "";
    applyFiltersAndSort();
  });

  // Event listener para ordenamiento por ubicación
  locationSort.addEventListener("change", () => {
    yearSort.value = "";
    applyFiltersAndSort();
  });

  clearButton.addEventListener("click", () => {
    yearFilter.value = "";
    locationFilter.value = "";
    yearSort.value = "";
    locationSort.value = "";
    clearAllFilters();
    updateDisplay({ processedData: data, stats: {} });
  });

  // Reemplaza el event listener actual del statsButton con este:
  statsButton.addEventListener("click", () => {
    // Limpiar el contenedor principal
    container.innerHTML = "";

    // Calcular las estadísticas
    const stats = computeStats(data);

    // Crear y mostrar el contenedor de estadísticas
    statsDisplay.innerHTML = `
      <div class="stats-container">
        <h2>Estadísticas de Inventos por País</h2>
        <ul class="stats-list">
          ${Object.entries(stats)
            .sort(([, a], [, b]) => b - a) // Ordenar por porcentaje de mayor a menor
            .map(
              ([country, percentage]) => `
              <li class="stats-item">
                <span class="country">${country}</span>
                <span class="percentage">${percentage}%</span>
              </li>
            `
            )
            .join("")}
        </ul>
      </div>
    `;
  });
  //Inicialización
  updateDisplay({ processedData: data, stats: {} });

  return viewEl;
};

function createFilter(label, options) {
  const select = document.createElement("select");
  select.innerHTML = `
    <option value="">${label}</option>
    ${options
      .map((option) => `<option value="${option}">${option}</option>`)
      .join("")}
  `;
  return select;
}

function createSort(label) {
  const select = document.createElement("select");
  select.innerHTML = `
    <option value="">${label}</option>
    <option value="asc">Ascendente</option>
    <option value="desc">Descendente</option>
  `;
  return select;
}

function getUniqueYears(data) {
  return [...new Set(data.map((item) => item.facts.yearOfEvent))].sort();
}

function getUniqueLocations(data) {
  return [...new Set(data.map((item) => item.facts.location))].sort();
}
