let cart = {
  products: []
};

const findProduct = (name, db) => {
  let foundProduct = db.products.filter(item => {
    if (name === item.name) {
      return true;
    }
  });

  // Checks if filter-function above returned true and if there is something in the first position
  if (foundProduct && foundProduct[0]) {
    return foundProduct[0];
  } else {
    console.log("Product not found.");
    return "Not Found";
  }
};

const addToCart = e => {
  const clickedProduct = e.parentElement.querySelector(".product-card__name")
    .textContent;
  const productInDb = findProduct(clickedProduct, localDb);

  let tempObj = {
    name: productInDb.name,
    price: productInDb.price,
    quantity: 1 // Change to html-input so users can add more than 1 items to cart?
  };
};

const getTotalPrice = () => {
  let price = 0;
  cart.products.forEach(item => {
    price += item.price;
  });

  return price;
};
