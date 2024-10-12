const cartItems = [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.getAttribute('data-name');
    const itemPrice = parseFloat(button.getAttribute('data-price'));
    addToCart(itemName, itemPrice);
  });
});

function addToCart(name, price) {
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let cartTotal = 0;

  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>&#8377; ${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>&#8377; ${itemTotal.toFixed(2)}</td>
      <td><button class="remove-item" data-name="${item.name}">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartTotalElement.textContent = ` ₹ ${cartTotal.toFixed(2)}`;

  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-name');
      removeFromCart(itemName);
    });
  });
}

function removeFromCart(name) {
  const itemIndex = cartItems.findIndex(item => item.name === name);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    updateCart();
  }
}
