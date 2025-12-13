import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu");
const orderSectionEl = document.getElementById("order");
const orderItemsEl = document.getElementById("order-items");
const totalPriceEl = document.getElementById("total-price");
const messageEl = document.getElementById("message");

const payModalContainer = document.getElementById("pay-modal-container");
const payForm = document.getElementById("pay-form");
const cancelBtn = document.getElementById("cancel-button");
const orderBtn = document.getElementById("order-button");

let order = []; // [{id, name, price}]

function renderMenu() {
  menuEl.innerHTML = menuArray
    .map(
      (item) => `
      <div class="menu-item">
        <span class="emoji">${item.emoji}</span>

        <div class="description">
          <h1>${item.name}</h1>
          <p>${item.ingredients.join(", ")}</p>
          <h2>$${item.price}</h2>
        </div>

        <button class="add-btn" data-add="${item.id}">+</button>
      </div>
    `
    )
    .join("");
}

function addToOrder(itemId) {
  const id = Number(itemId);
  const item = menuArray.find((m) => m.id === id);
  if (!item) return;

  order.push({ id: item.id, name: item.name, price: item.price });
  renderOrder();
}

function removeFromOrder(itemId) {
  const id = Number(itemId);

  const idx = order.findIndex((o) => o.id === id);
  if (idx !== -1) order.splice(idx, 1);

  renderOrder();
}

function getTotal() {
  return order.reduce((sum, item) => sum + item.price, 0);
}

function renderOrder() {
  messageEl.innerHTML = "";

  if (order.length === 0) {
    orderSectionEl.classList.add("hidden");
    orderItemsEl.innerHTML = "";
    totalPriceEl.textContent = "$0";
    return;
  }

  orderSectionEl.classList.remove("hidden");

  orderItemsEl.innerHTML = order
    .map(
      (item) => `
      <li class="order-item">
        <div class="order-left">
          <span class="order-name">${item.name}</span>
          <button class="remove-btn" data-remove="${item.id}">remove</button>
        </div>
        <span class="order-price">$${item.price}</span>
      </li>
    `
    )
    .join("");

  totalPriceEl.textContent = `$${getTotal()}`;
}

/* Events */
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) addToOrder(e.target.dataset.add);
  if (e.target.dataset.remove) removeFromOrder(e.target.dataset.remove);
});

orderBtn.addEventListener("click", () => {
  if (order.length === 0) return;
  payModalContainer.classList.add("show");
});

cancelBtn.addEventListener("click", () => {
  payModalContainer.classList.remove("show");
});

payForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim() || "friend";

  payModalContainer.classList.remove("show");

  order = [];
  renderOrder();

  messageEl.innerHTML = `
    <div class="thanks">
      Thanks, ${name}! Your order is on its way!
    </div>
  `;

  payForm.reset();
});


renderMenu();
renderOrder();
