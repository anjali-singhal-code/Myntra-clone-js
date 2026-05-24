let bagItem;

function getCartItems() {
  bagItem = cart.map((cartItem) => {
    for (let item of items) {
      if (cartItem.id == item.id) {
        return {
          ...item,
          quantity: cartItem.quantity
        };
      }
    }
  })
}
getCartItems();
updateCartCount();

function displayCartItems() {
  let cartItemsContainer = document.querySelector('.cart-items-container');
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';
  bagItem.forEach((item) => {
    let bagItems = `
    <div class="item-container" id='${item.id}'>
      <img class="cart-image" src="./${item.image}" alt="">
      <div class="cart-details">
      <span class="delete-btn">X</span>
        <span class="cart-heading">${item.company}</span>
        <p class="cart-description">${item.item_name}</p>
        <div class="quantity-container">
          <span class="quantity">Qty:</span>
          <span class="add-quantity">+</span>
          <span class="quantity-count">${item.quantity}</span>
          <span class="minus-quantity">-</span>
        </div>
        <div class="cart-item-price">
          <span class="cart-current-price">₹ ${item.current_price}</span>
          <span class="cart-original-price">₹ ${item.original_price}</span>
          <span class="cart-discount-percentage">₹ ${item.discount_percentage}% OFF</span>
        </div>
        <p class="cart-return">
          <span class="material-symbols-outlined return-icon">replay</span>
          ${item.return_period} Days <span>return available</span></p>
        <div class="cart-delivery-date">
          Delivery by <span>${item.delivery_date}</span>
          </span>
        </div>
      </div>
    </div>`

    cartItemsContainer.insertAdjacentHTML("beforeend", bagItems);
  })

}


let cartItemsContainer = document.querySelector('.cart-items-container');     
cartItemsContainer.addEventListener('click', (e) => {
  if(!cartItemsContainer) return
  let container = e.target.closest('.item-container');
  let quantity = container.querySelector('.quantity-count');

  if (e.target.classList.contains('add-quantity')) {
    for (let i of cart) {
      if(container.id == i.id) {
        i.quantity++;
        qty = quantity.innerText;
        qty++;
        quantity.innerText = qty;
        updateCartCount();
        getCartItems();
        priceDetails();
      }
    }
  }     

  if(e.target.classList.contains('minus-quantity')) {
    cart.forEach((item, index) => {
      if(container.id == item.id) {
        item.quantity--;
        qty = quantity.innerText;
        qty--;
        quantity.innerText = qty;
        updateCartCount();
        getCartItems();
        priceDetails();

        if(item.quantity <= 0) {
          cart.splice(index, 1);
          container.remove();
          updateCartCount();
          getCartItems();
          priceDetails();
        }
      }
  })
}


  let deleteBtn = container.querySelector('.delete-btn');
  if(e.target.classList.contains('delete-btn')) {
    cart.filter((item, index) => {
      if(container.id == item.id) {
        container.remove();
        cart.splice(index, 1);
        updateCartCount();
        getCartItems();
        priceDetails();
      }
    })
  }
 
  }
)

function priceDetails() {
  let priceDetailsContainer = document.querySelector('.price-details-container');
  let totalMRP = 0;
  let discountOnMRP = 0;
  let platformFee = 23;
  
  bagItem.forEach((item) => {
    let prices = item.original_price * item.quantity;
    let discounts = item.original_price - item.current_price;
    discountOnMRP += discounts;
    totalMRP += prices;
  })
  let totalAmount = totalMRP - discountOnMRP + platformFee;

  priceDetailsContainer.innerHTML = `<div class="price-heading">
      <span>PRICE DETAILS</span>
      <span>(${bagItem.length} item)</span>
    </div>
    <div class="total-mrp">
      <span class="total-mrp-heading">Total MRP</span>
      <span class="total-mrp-amount">₹ ${totalMRP}</span>
    </div>
    <div class="discount-mrp">
      <span class="discount-mrp-heading">Discount on MRP</span>
      <span class="total-mrp-amount">-₹ ${discountOnMRP}</span>
    </div>
    <div class="platform-fee">
      <span class="platform-fee-heading">Platform Fee</span>
      <span class="total-mrp-amount">₹ ${platformFee}</span>
    </div>
    <div class="total-amount">
      <span class="total-amount-heading">Total Amount</span>
      <span class="total-amount-amount">₹ ${totalAmount}</span>
    </div>
    <button class='order-button'>PLACE ORDER</button>
    </div>`;

}

displayCartItems();
priceDetails();
