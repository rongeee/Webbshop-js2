let cart = {
  products: []
};

const addToCart = e => {
  const clickedProduct = e.parentElement.querySelector(".product-card__name")
    .textContent;

  localDb.products.forEach(item => {
    if (item.name.includes(clickedProduct)) {
      cart.products.push(item);
    }
  });
};

const getTotalPrice = () => {
  let price = 0;
  cart.products.forEach(item => {
    price += item.price;
  });

  return price;
};
