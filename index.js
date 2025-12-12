import { menuArray } from "./data.js";

const menuItem = document.getElementById("menu-item");

function renderMenuItem(menu) {
  let menuItems = "";

  for (let item of menu) {
    menuItems += `
        <span class="emoji">${item.emoji}</span>
        <div class="description">
          <h1>${item.name}</h1>
          <p>${item.ingredients.join(", ")}</p>
          <h2>$${item.price}</h2>
        </div>
        <button class="add-btn">+</button>
    `;
  }

  menuItem.innerHTML = menuItems;
}

renderMenuItem(menuArray);


