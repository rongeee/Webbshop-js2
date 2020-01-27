let cart = [];

// Köra cart i localstorage istället?
localStorage.setItem("cart", JSON.stringify(cart));

const addToCart = e => {
  const clickedProduct = e.parentElement.querySelector(".product-card__name")
    .textContent;

  localDb.products.forEach(item => {
    if (item.name.includes(clickedProduct)) {
      let tempObj = {
        name: item.name,
        price: item.price,
        quantity: "FIXA"
      };
      cart.push(tempObj);
    }
  });

  // Köra cart i localstorage istället?
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getTotalPrice = () => {
  let price = 0;
  cart.forEach(item => {
    price += item.price;
  });

  return price;
};
