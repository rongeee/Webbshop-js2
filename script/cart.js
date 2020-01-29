// TODO: Add localStorage-handling?

let cart = {
  products: []
};

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
  const clickedProduct = e.parentElement.querySelector(".product-card__name")
    .textContent;
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
  renderCart();
  updateLocalStorage();
  // Local store cart items and total price
};

const updateLocalStorage = () => {
  const tempStr = JSON.stringify(testCart.products);
  localStorage.setItem(testCart.key, tempStr);
};

const getTotalPrice = () => {
  let price = 0;

  testCart.products.forEach(item => {
    price += item.price * item.quantity;
  });

  return price;
};

const removeItem = e => {
  const item = e.target.parentElement.childNodes[1].textContent;
  const productInCart = findProduct(item, testCart);

  testCart.products = testCart.products.filter(item => {
    return item.name !== productInCart.name;
  });

  console.log(testCart.products);

  updateLocalStorage();
  renderCart();
};

const addBtnEvent = btns => {
  console.log("hej");
  btns.forEach(item => {
    console.log(item);
    item.addEventListener("click", e => {
      removeItem(e);
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
                          <div class="cart-fixed__qty">${item.quantity}</div> 
                          <span class="cart-fixed__remove-btn">X</span>
                        </li>`;
  });

  const removeBtn = document.querySelectorAll(".cart-fixed__remove-btn");
  console.log(removeBtn);
  addBtnEvent(removeBtn);
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
console.log(checkLocalStorage());
renderCart();

// document.addEventListener("DOMContentLoaded", function() {
//   localStorage.clear();
// });
