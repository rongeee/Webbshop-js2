const productContainer = document.querySelector(".products__container");
console.log(productContainer);

fetch("./products.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
    data.shirts.forEach(item => {
      productContainer.innerHTML += `
      <div class="products__product-card">
      <div class="product-card__image"></div>
      <h2 class="product-card__name">${item.name}</h2>
      <p class="product-card__price">${item.price}kr</p>
      <button type="submit" class="product-card__buy-btn">
        Add to cart
      </button>
    </div>
        `;
    });
    for (let i = 0; i < data.length; i++) {
      console.log("jasjsa");
    }
  });
