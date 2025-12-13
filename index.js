import { menuArray } from "./data.js";

const menuItem = document.getElementById("menu");

function renderMenuItem(menu){
  menuItem.innerHTML = menu
    .map(item => `
      <div class="menu-item">
        <span class="emoji">${item.emoji}</span>

        <div class="description">
          <h1>${item.name}</h1>
          <p>${item.ingredients.join(", ")}</p>
          <h2>$${item.price}</h2>
        </div>

        <button class="add-btn">+</button>
      </div>
    `)
    .join("");
}

renderMenuItem(menuArray);


