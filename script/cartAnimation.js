const cartContainer = document.querySelector('.cart-fixed');
const hideBtn = document.querySelector('.cart-fixed__name-total-wrap');

hideBtn.addEventListener('click', function() {
  if (cartContainer.classList.contains('foldedXY')) {
    cartContainer.classList.remove('foldedXY');
    cartContainer.classList.add('unfoldedX');
    setTimeout(() => {
      cartContainer.classList.remove('unfoldedX');
      cartContainer.classList.add('unfoldedXY');
    }, 200);
  } else {
    cartContainer.classList.add('foldedY');
    cartContainer.classList.remove('unfoldedXY');
    setTimeout(() => {
      cartContainer.classList.remove('foldedY');
      cartContainer.classList.add('foldedXY');
    }, 200);
  }
});

window.addEventListener('load', function() {
  const addBtns = document.querySelectorAll('.product-card__buy-btn');
  const notif = document.querySelector('.cart-fixed__qty-notif');
  const time = getComputedStyle(notif).transitionDuration;

  console.log(time);
  addBtns.forEach(item => {
    item.addEventListener('click', function() {
      notif.classList.toggle('bounce');
      setTimeout(() => {
        notif.classList.toggle('bounce');
        //Change the animation time in the CSS class, must be kept under 1000ms!
        // Must be even hundred number 100, 200, 300 etc...
      }, time.replace('s', '00').replace('0.', ''));
    });
  });
});
