const localDb = {
  products: []
};
const URL = "./products.json";

const cardTemplate = (name, price, img, qty) => {
  return `
    <div class="products__product-card">
    <div class="product-card__image"><img src=${img}></div>
    <h3 class="product-card__name">${name}</h3>
    <div class="product-card__price-container">
      <p class="product-card__price">${price} <span class="product-card__currency">kr</span></p>
      <p class="product-card__stock">In Stock: x${qty}</p>
    </div>
    <div class="product-card__btn-qty-wrap">
      <button type="submit" class="product-card__buy-btn">
        Add to cart
      </button>
      <div class="product-card__qty-container">
      <button class="product-card__neg-qty product-card__qty-btn" type="button">-</button>
      <input class="product-card__qty" value="1" type="text">
      <button class="product-card__up-qty product-card__qty-btn" type="button">+</button>
      </div>
    </div>
    </div>
    `;
};

const renderProducts = items => {
  localDb.products = items.products;

  items.products.forEach(item => {
    let container = document.querySelector(
      `.products__${item.category} .products__card-container`
    );

    container.innerHTML += cardTemplate(
      item.name,
      item.price,
      item.image,
      item.quantity
    );
  });

  const addBtn = document.querySelectorAll(".product-card__buy-btn");
  const upQtyBtn = document.querySelectorAll(".product-card__up-qty");
  const negQtyBtn = document.querySelectorAll(".product-card__neg-qty");
  const qtyInput = document.querySelectorAll(".product-card__qty");
  HappyLib.addEvents(upQtyBtn, increaseQty, "click");
  HappyLib.addEvents(negQtyBtn, decreaseQty, "click");
  HappyLib.addEvents(qtyInput, handleQty, "change");
  HappyLib.addEvents(addBtn, addToCart, "click");
};

HappyLib.loadProducts(URL, renderProducts);
