const productShirts = document.querySelector(
  ".products__shirts .products__card-container"
);
const productHats = document.querySelector(
  ".products__hats .products__card-container"
);
const productShoes = document.querySelector(
  ".products__shoes .products__card-container"
);

const localDb = {
  products: []
};

const cardTemplate = (name, price, img) => {
  return `
    <div class="products__product-card">
    <div class="product-card__image"></div>
    <h3 class="product-card__name">${name}</h3>
    <p class="product-card__price">${price}kr</p>
    <button type="submit" class="product-card__buy-btn" onclick="addToCart(this)">
      Add to cart
    </button>
    </div>
    `;
};

async function getProducts() {
  return fetch("./products.json").then(res => {
    return res.json();
  });
}

getProducts().then(data => {
  console.log(data);

  data.products.forEach(item => {
    localDb.products.push(item);

    switch (item.category) {
      case "shirts":
        productShirts.innerHTML += cardTemplate(item.name, item.price);
        break;
      case "hats":
        productHats.innerHTML += cardTemplate(item.name, item.price);
        break;
      case "shoes":
        productShoes.innerHTML += cardTemplate(item.name, item.price);
        break;
    }
  });
});
