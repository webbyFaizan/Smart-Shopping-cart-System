const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 },
  { id: 4, name: "Keyboard", price: 1500 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    productList.innerHTML += `
      <div class="product">
        <span>${product.name} - ₹${product.price}</span>
        <button class="add-btn" onclick="addToCart(${product.id})">Add</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Cart is empty</p>";
  }

  cart.forEach(item => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (₹${item.price})</span>
        <div>
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          ${item.quantity}
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeItem(${item.id})">X</button>
        </div>
      </div>
    `;
  });

  calculateTotal();
}

function changeQty(id, change) {
  const item = cart.find(p => p.id === id);
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

function calculateTotal() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const discount = subtotal > 1000 ? subtotal * 0.10 : 0;
  const total = subtotal + tax - discount;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("tax").innerText = tax.toFixed(2);
  document.getElementById("discount").innerText = discount.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);
}

renderProducts();
renderCart();
