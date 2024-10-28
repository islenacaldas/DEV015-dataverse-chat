import { navigationTo } from "../router.js";

export const cards = (data) => {
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

    navigationTo("card", { id: item.id });
  });
  return ul;
};
