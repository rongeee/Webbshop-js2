const productShirts = document.querySelector(
  ".products__shirts .products__card-container"
);
const productHats = document.querySelector(
  ".products__hats .products__card-container"
);
const productShoes = document.querySelector(
  ".products__shoes .products__card-container"
);

const cardTemplate = (name, price, img) => {
  return `
    <div class="products__product-card">
    <div class="product-card__image"></div>
    <h3 class="product-card__name">${name}</h3>
    <p class="product-card__price">${price}kr</p>
    <button type="submit" class="product-card__buy-btn">
      Add to cart
    </button>
    </div>
    `;
};

fetch("./products.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
    data.shirts.forEach(item => {
      productShirts.innerHTML += cardTemplate(item.name, item.price);
    });
    data.hats.forEach(item => {
      productHats.innerHTML += cardTemplate(item.name, item.price);
    });
    data.shoes.forEach(item => {
      productShoes.innerHTML += cardTemplate(item.name, item.price);
    });
  });
