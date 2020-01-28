// TODO: Add localStorage-handling?

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
    return false;
  }
};

const addToCart = e => {
  const clickedProduct = e.parentElement.querySelector('.product-card__name')
    .textContent;
  const productInDb = findProduct(clickedProduct, localDb);
  const productInCart = findProduct(clickedProduct, cart);

  // Checks the productInDb variable to see if it contains a product
  if (productInDb) {
    let tempObj = {
      name: productInDb.name,
      price: productInDb.price,
      quantity: 1 // TODO? Change to html-input so users can add more than 1 items to cart?
    };

    // Checks if the clicked item already exists in cart.
    // Pushes the product to the cart if it does not exist
    // Raises quantity by 1 if it already exists
    if (!productInCart) {
      cart.products.push(tempObj);
    } else {
      productInCart.quantity += 1;
    }
  } else {
    console.error('The fuck did you do?');
  }
  updateCart();

  // Session store cart items and total price
  const tempStr = JSON.stringify(cart.products);
  const tot = getTotalPrice();
  sessionStorage.setItem('cart', tempStr);
  sessionStorage.setItem('total', tot);
};

const getTotalPrice = () => {
  let price = 0;
  const totalPrice = document.querySelector('.cart-fixed__total');

  cart.products.forEach(item => {
    price += item.price * item.quantity;
  });
  totalPrice.textContent = `${price}kr`;
  return price;
};

const updateCart = () => {
  const items = document.querySelector('.cart-fixed__cart-items');
  items.innerHTML = '';
  cart.products.forEach(item => {
    items.innerHTML += `<li>${item.name} - ${item.quantity}</li>`;
  });
  getTotalPrice();
};

document.addEventListener('DOMContentLoaded', function() {
  sessionStorage.clear();
});
