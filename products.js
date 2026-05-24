const params = new URLSearchParams(window.location.search);

const category = params.get('category');
console.log(category);


const filteredProducts = items.filter((item) => {
  return item.category === category;
})

function displayProductItems() {
  const container = document.getElementById('products-container');

  for (let item of filteredProducts) {
    let displayitem = `
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

    container.insertAdjacentHTML('beforeend', displayitem);
  }

}
displayProductItems();