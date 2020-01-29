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
    <div class="product-card__image"><img src=${img}></div>
    <h3 class="product-card__name">${name}</h3>
    <p class="product-card__price">${price}kr</p>
    <button type="submit" class="product-card__buy-btn">
      Add to cart
    </button>
    <input class="product-card__qty" value="1" type="number">
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

async function getProducts() {
  fetch("./products.json")
    .then(handleErrors)
    .then(data => {
      data.products.forEach(item => {
        localDb.products.push(item);

        switch (item.category) {
          case "shirts":
            productShirts.innerHTML += cardTemplate(
              item.name,
              item.price,
              item.image
            );
            break;
          case "hats":
            productHats.innerHTML += cardTemplate(
              item.name,
              item.price,
              item.image
            );
            break;
          case "shoes":
            productShoes.innerHTML += cardTemplate(
              item.name,
              item.price,
              item.image
            );
            break;
        }
      });
      const addBtn = document.querySelectorAll(".product-card__buy-btn");
      addBtnEvent(addBtn, addToCart, "click");
    })
    .catch(error => {
      console.error(error);
    });
}

getProducts();
