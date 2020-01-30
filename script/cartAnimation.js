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
