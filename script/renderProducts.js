const localDb = {
  products: []
};

const cardTemplate = (name, price, img) => {
  return `
    <div class="products__product-card">
    <div class="product-card__image"><img src=${img}></div>
    <h3 class="product-card__name">${name}</h3>
    <p class="product-card__price">${price}kr</p>
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

const handleErrors = response => {
  if (!response.ok) {
    throw Error(
      `Status: ${response.status}
       Statustext: ${response.statusText}
       Comment: Psst, checka vad fetchen pekar på`
    );
  }
  return response.json();
};

function getProducts() {
  fetch('./products.json')
    .then(handleErrors)
    .then(data => {
      data.products.forEach(item => {
        localDb.products.push(item);

        let container = document.querySelector(
          `.products__${item.category} .products__card-container`
        );
        container.innerHTML += cardTemplate(item.name, item.price, item.image);
      });

      const addBtn = document.querySelectorAll('.product-card__buy-btn');
      const upQtyBtn = document.querySelectorAll('.product-card__up-qty');
      const negQtyBtn = document.querySelectorAll('.product-card__neg-qty');
      const qtyInput = document.querySelectorAll('.product-card__qty');
      addBtnEvent(upQtyBtn, increaseQty, 'click');
      addBtnEvent(negQtyBtn, decreaseQty, 'click');
      addBtnEvent(qtyInput, handleQty, 'change');
      addBtnEvent(addBtn, addToCart, 'click');
    })
    .catch(error => {
      console.error(error);
    });
}

getProducts();
