// TODO: Add localStorage-handling?

const testCart = {
  // Key should be randomized in a real project. Used as reference point and unique identifier
  key: "qwerqwerqwerqwerqwerqwer",
  products: []
};

const checkLocalStorage = () => {
  let testProducts = localStorage.getItem(testCart.key);
  if (testProducts) {
    testCart.products = JSON.parse(testProducts);
    return true;
  }
};

const findProduct = (name, db) => {
  let foundProduct = db.products.filter(item => {
    if (name === item.name) {
      return item;
    }
  });
  return foundProduct[0];
};

const addToCart = e => {
  const clickedProduct = e.target.parentElement.querySelector(
    ".product-card__name"
  ).textContent;

  const productInDb = findProduct(clickedProduct, localDb);
  const productInCart = findProduct(clickedProduct, testCart);

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
      testCart.products.push(tempObj);
    } else {
      productInCart.quantity += 1;
    }
  } else {
    console.error("The fuck did you do?");
  }
  updateLocalStorage(renderCart);
  // Local store cart items and total price
};

const updateLocalStorage = cb => {
  const tempStr = JSON.stringify(testCart.products);
  localStorage.setItem(testCart.key, tempStr);
  if (cb) {
    cb();
  }
};

const getTotalPrice = () => {
  let price = 0;

  testCart.products.forEach(item => {
    price += item.price * item.quantity;
  });

  return price;
};

const removeItem = e => {
  const item = e.target.parentElement.querySelector(".cart-fixed__name")
    .textContent;

  const productInCart = findProduct(item, testCart);

  testCart.products = testCart.products.filter(item => {
    return item.name !== productInCart.name;
  });

  updateLocalStorage(renderCart);
};

const changeQuantity = e => {
  const val = e.target.parentElement.querySelector(".cart-fixed__qty");
  const item = e.target.parentElement.querySelector(".cart-fixed__name")
    .textContent;

  const productInCart = findProduct(item, testCart);
  productInCart.quantity = val.value;
  updateLocalStorage(renderCart);
};

const addBtnEvent = (btns, func, type) => {
  btns.forEach(item => {
    item.addEventListener(type, e => {
      func(e);
    });
  });
};

const renderCart = () => {
  const items = document.querySelector(".cart-fixed__cart-items");
  const totalPrice = document.querySelector(".cart-fixed__total");
  const price = getTotalPrice();

  items.innerHTML = "";
  testCart.products.forEach(item => {
    items.innerHTML += `<li class="cart-fixed__item">
                          <div class="cart-fixed__name">${item.name}</div>
                          <input type="number" value="${item.quantity}" class="cart-fixed__qty">
                          <span class="cart-fixed__remove-btn">X</span>
                        </li>`;
  });

  const removeBtn = document.querySelectorAll(".cart-fixed__remove-btn");
  const qtyInput = document.querySelectorAll(".cart-fixed__qty");

  addBtnEvent(removeBtn, removeItem, "click");
  addBtnEvent(qtyInput, changeQuantity, "change");

  totalPrice.textContent = `${price} kr`;
};

const clearCart = () => {
  const items = document.querySelector(".cart-fixed__cart-items");
  const totalPrice = document.querySelector(".cart-fixed__total");
  items.innerHTML = "";
  totalPrice.textContent = "0 kr";
  testCart.products = [];
  localStorage.clear();
};

checkLocalStorage();

document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelector(".cart-fixed__clear")) {
    const clearBtn = document.querySelector(".cart-fixed__clear");
    clearBtn.addEventListener("click", clearCart);
    renderCart();
  }
});
