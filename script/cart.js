// TODO: Add localStorage-handling?

const cart = {
  // Key should be randomized in a real project. Used as reference point and unique identifier
  key: 'qwerqwerqwerqwerqwerqwer',
  products: []
};

const checkLocalStorage = () => {
  let testProducts = localStorage.getItem(cart.key);
  console.log(testProducts);
  if (testProducts) {
    cart.products = JSON.parse(testProducts);
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
  const clickedProduct = e.target.parentElement.parentElement.querySelector(
    '.product-card__name'
  ).textContent;
  const qtyInput = e.target.parentElement.querySelector('.product-card__qty');
  const productInDb = findProduct(clickedProduct, localDb);
  const productInCart = findProduct(clickedProduct, cart);
  // Checks so the user has not edited the amount in DevTools and set a negative number
  if (qtyInput.value <= 0) {
    qtyInput.value = 1;
  }
  if (productInDb.quantity < qtyInput.value) {
    alert(
      `You can't buy that many items we only have ${productInDb.quantity} left in stock`
    );
  } else {
    // Checks the productInDb variable to see if it contains a product
    if (productInDb) {
      let tempObj = {
        name: productInDb.name,
        price: productInDb.price,
        quantity: parseInt(qtyInput.value),
        image: productInDb.image
      };
      // Checks if the clicked item already exists in cart.
      // Pushes the product to the cart if it does not exist
      // Raises quantity by input quantity value if it already exists

      if (!productInCart) {
        cart.products.push(tempObj);
      } else {
        productInCart.quantity += parseInt(qtyInput.value);
        // If quantity is raised above the current stock quantity the value will be set to the max stock quantity
        if (productInDb.quantity < productInCart.quantity) {
          productInCart.quantity = productInDb.quantity;
        }
      }
    } else {
      console.error('The fuck did you do?');
    }
    updateLocalStorage(renderCart);
    // Local store cart items and total price
  }
};

const updateLocalStorage = cb => {
  const tempStr = JSON.stringify(cart.products);
  localStorage.setItem(cart.key, tempStr);
  if (cb) {
    cb();
  }
};

const getTotalPrice = () => {
  let price = 0;

  cart.products.forEach(item => {
    price += item.price * item.quantity;
  });

  return price;
};

const increaseQty = e => {
  const inputQty = e.target.parentElement.querySelector('.product-card__qty');
  let realValue = parseInt(inputQty.value);
  realValue += 1;
  inputQty.value = realValue;
};

const decreaseQty = e => {
  const inputQty = e.target.parentElement.querySelector('.product-card__qty');
  let realValue = parseInt(inputQty.value);

  if (realValue > 1) {
    realValue -= 1;
    inputQty.value = realValue;
  }
};

const handleQty = e => {
  const inputQty = e.target.parentElement.querySelector('.product-card__qty');

  if (inputQty.value <= 0) {
    inputQty.value = 1;
  }
};

const handleCartQty = e => {
  const clickedProduct = e.target.parentElement.querySelector(
    '.cart-fixed__name'
  ).textContent;
  const inputQty = e.target.parentElement.querySelector('.cart-fixed__qty');
  const productInDb = findProduct(clickedProduct, localDb);
  const productInCart = findProduct(clickedProduct, cart);
  if (inputQty.value > productInDb.quantity) {
    productInCart.quantity = productInDb.quantity;
    updateLocalStorage(renderCart);
    alert('Stock limit reached');
  }
};

const getTotalQty = () => {
  let total = 0;

  cart.products.forEach(item => {
    total += parseInt(item.quantity);
  });
  return total;
};

const removeItem = e => {
  const item = e.target.parentElement.querySelector('.cart-fixed__name')
    .textContent;

  const productInCart = findProduct(item, cart);

  cart.products = cart.products.filter(item => {
    return item.name !== productInCart.name;
  });

  updateLocalStorage(renderCart);
};

const changeQuantity = e => {
  const val = e.target.parentElement.querySelector('.cart-fixed__qty');
  const item = e.target.parentElement.querySelector('.cart-fixed__name')
    .textContent;

  const productInCart = findProduct(item, cart);
  productInCart.quantity = val.value;
  if (val.value <= 0) {
    cart.products = cart.products.filter(item => {
      return item.name !== productInCart.name;
    });
  }
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
  const items = document.querySelector('.cart-fixed__cart-items');
  const totalPrice = document.querySelector('.cart-fixed__total');
  const totalQty = document.querySelector('.cart-fixed__total-qty');
  const price = getTotalPrice();
  const qty = getTotalQty();

  items.innerHTML = '';
  cart.products.forEach(item => {
    items.innerHTML += `<li class="cart-fixed__item">
                          <div class="cart-fixed__name">${item.name}</div>
                          <input type="number" value="${
                            item.quantity
                          }" class="cart-fixed__qty">
                          <div>${item.price * item.quantity} kr</div>
                          <span class="cart-fixed__remove-btn">remove</span>
                        </li>`;
  });

  const removeBtn = document.querySelectorAll('.cart-fixed__remove-btn');
  const qtyInput = document.querySelectorAll('.cart-fixed__qty');

  addBtnEvent(removeBtn, removeItem, 'click');
  addBtnEvent(qtyInput, changeQuantity, 'change');
  addBtnEvent(qtyInput, handleCartQty, 'change');

  totalPrice.textContent = `${price} kr`;
  totalQty.textContent = `${qty}`;
};

const clearCart = () => {
  const items = document.querySelector('.cart-fixed__cart-items');
  const totalPrice = document.querySelector('.cart-fixed__total');
  const totalProductQty = document.querySelector('.cart-fixed__total-qty');
  items.innerHTML = '';
  totalProductQty.textContent = '0';
  totalPrice.textContent = '0 kr';
  cart.products = [];
  localStorage.clear();
};

const renderCheckout = e => {
  e.preventDefault();
  const target = e.target.href;
  const loadPopup = `<div class="load-popup">
                        <h2 class="load-popup__headline">Your order is being processed!</h2>
                        <img class="load-popup__animation" src="./images/loading.svg">
                      </div>`;

  document.body.innerHTML = loadPopup;

  setTimeout(function() {
    window.location = target;
  }, 500);
};

checkLocalStorage();

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.cart-fixed__clear')) {
    const purchaseBtn = document.querySelector('.cart-fixed__checkout');
    const clearBtn = document.querySelector('.cart-fixed__clear');

    purchaseBtn.addEventListener('click', renderCheckout);
    clearBtn.addEventListener('click', clearCart);
    renderCart();
  }
});
