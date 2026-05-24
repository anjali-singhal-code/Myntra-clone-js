let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.querySelector('.cart-count');


function addToCart(itemId) {
  let existingItem = cart.find((item) => item.id === itemId);
  if(existingItem) {
      existingItem.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart.push({id : itemId, quantity : 1});
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCartCount();
}

function updateCartCount() {
    let totalQuantity = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    if(totalQuantity <= 0) {
      cartCount.style.visibility = 'hidden';
    } else {
     cartCount.style.visibility = 'visible';
     cartCount.innerHTML = totalQuantity;
    } 

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
function displayItems() {
  let offerItemsContainer = document.querySelector('.offer-items');

  if (!offerItemsContainer) return;

  for (let item of items) {
    let displayItem = `
    <div class="items">
      <img class="item-image" src="./${item.image}" alt="this is item image">
      <div class="rating-container">
        <span class="ratings">${item.rating.stars} ⭐</span> 
        <span class="rating-reviews">| ${item.rating.count}</span>
      </div>
      <div class="item-name">${item.company} </div>
      <div class="item-description">${item.item_name} </div>
      <div class="price-container">
        <span class="current-price">Rs.${item.current_price}</span>
        <span class="original-price">Rs. ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <button class="cart-btn" onclick="
        addToCart(${item.id});
      ">Add to cart</button>
    </div>
  `
    offerItemsContainer.insertAdjacentHTML('beforeend', displayItem);
  }
  
}
displayItems();
updateCartCount()


let searchSuggestion = document.querySelector('.suggestion');

let searchInput = document.querySelector('.search_input');
searchInput.addEventListener('keyup', (e) => {
  let value = searchInput.value.toLowerCase().trim();

  if(value === '') {
    return searchSuggestion.innerHTML = '';
  };

  let filtered = items.filter((item) => {
    return item.item_name.toLowerCase().includes(value);
  })
  
  searchSuggestion.innerHTML = '';
  if(filtered.length === 0) {
    let div1 = document.createElement("div");
    div1.classList.add('not-found');
    div1.innerHTML = 'No Result Found';
    div1.disabled = 'disabled';
    searchSuggestion.appendChild(div1);
  };
  
  filtered.forEach((item => {
    let div = document.createElement('div');
    div.classList.add('search-suggestion');
    div.innerHTML = item.item_name;
    searchSuggestion.appendChild(div);
    div.onclick = () => {
      displaySearchItem(item);
    }
  }))
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest(".search-bar")) {
      searchSuggestion.innerHTML = '';
    }
  })
})

function displaySearchItem(item) {
  console.log(item);
  
}