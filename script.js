const menuItems = [
  {
    id: 1,
    name: "Sourdough Loaf",
    category: "bread",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?auto=format&fit=crop&w=900&q=80",
    description: "Crispy crust, airy crumb, naturally fermented.",
  },
  {
    id: 2,
    name: "Butter Croissant",
    category: "pastry",
    price: 4.25,
    image:
      "https://images.unsplash.com/photo-1555507036-ab794f575c1d?auto=format&fit=crop&w=900&q=80",
    description: "Flaky, golden pastry with cultured butter.",
  },
  {
    id: 3,
    name: "Chocolate Cake Slice",
    category: "cake",
    price: 5.75,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    description: "Rich cocoa sponge and silky ganache.",
  },
  {
    id: 4,
    name: "Almond Cookies (6)",
    category: "cookie",
    price: 4.95,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80",
    description: "Crunchy edges with toasted almond flavor.",
  },
  {
    id: 5,
    name: "Berry Tart",
    category: "pastry",
    price: 5.4,
    image:
      "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=900&q=80",
    description: "Vanilla custard with seasonal berries.",
  },
  {
    id: 6,
    name: "Vanilla Celebration Cake",
    category: "cake",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=900&q=80",
    description: "Serves 8. Layers of sponge, cream, and jam.",
  },
];

const menuGrid = document.getElementById("menuGrid");
const filterSelect = document.getElementById("categoryFilter");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cartPanel = document.getElementById("cartPanel");
const cartCount = document.getElementById("cartCount");
const cartItemsList = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cart = [];

function renderMenu(category = "all") {
  const visibleItems =
    category === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = visibleItems
    .map(
      (item) => `
      <article class="card">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <div class="price-row">
          <strong>$${item.price.toFixed(2)}</strong>
          <button class="add-btn" data-id="${item.id}">Add to Cart</button>
        </div>
      </article>
    `,
    )
    .join("");
}

function renderCart() {
  cartItemsList.innerHTML = cart.length
    ? cart
        .map(
          (item) =>
            `<li><span>${item.name}</span><span>$${item.price.toFixed(2)}</span></li>`,
        )
        .join("")
    : `<li><span>Your cart is empty.</span><span></span></li>`;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-btn");
  if (!button) return;

  const itemId = Number(button.dataset.id);
  const selectedItem = menuItems.find((item) => item.id === itemId);

  if (selectedItem) {
    cart.push(selectedItem);
    renderCart();
  }
});

filterSelect.addEventListener("change", (event) => {
  renderMenu(event.target.value);
});

cartButton.addEventListener("click", () => {
  cartPanel.classList.toggle("show");
  cartPanel.setAttribute(
    "aria-hidden",
    String(!cartPanel.classList.contains("show")),
  );
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("show");
  cartPanel.setAttribute("aria-hidden", "true");
});

renderMenu();
renderCart();
