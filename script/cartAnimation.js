const cart = document.querySelector('.cart-fixed');
const hideBtn = document.querySelector('.cart-fixed__headline');
cart.style = 'transform: translateY(0px)';

hideBtn.addEventListener('click', function() {
  console.log(cart.style.transform);
  if (cart.style.transform != 'translateY(0px)') {
    cart.style = 'transform: translateY(0px)';
  } else {
    cart.style = 'transform: translateY(' + (cart.clientHeight - 60) + 'px)';
  }
});

// Makes sure cart does not stick up more than it should when cart item list gets taller
document.addEventListener('DOMContentLoaded', function() {
  let addBtns;
  setTimeout(() => {
    addBtns = document.querySelectorAll('.product-card__buy-btn');
    console.log(addBtns);

    addBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        if (cart.style.transform != 'translateY(0px)') {
          cart.style =
            'transform: translateY(' + (cart.clientHeight - 60) + 'px)';
        }
      });
    });
  }, 200);
});
