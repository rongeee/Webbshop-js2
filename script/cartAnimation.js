const cartContainer = document.querySelector(".cart-fixed");
const hideBtn = document.querySelector(".cart-fixed__name-total-wrap");
cartContainer.style = "transform: translateY(0px)";

hideBtn.addEventListener("click", function() {
  console.log(cartContainer.style.transform);
  if (cartContainer.style.transform != "translateY(0px)") {
    cartContainer.style = "transform: translateY(0px)";
  } else {
    cartContainer.style =
      "transform: translateY(" + (cartContainer.clientHeight - 60) + "px)";
  }
});

// Makes sure cartContainer does not stick up more than it should when cartContainer item list gets taller
document.addEventListener("DOMContentLoaded", function() {
  let addBtns;
  setTimeout(() => {
    addBtns = document.querySelectorAll(".product-card__buy-btn");
    console.log(addBtns);

    addBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        if (cartContainer.style.transform != "translateY(0px)") {
          cartContainer.style =
            "transform: translateY(" +
            (cartContainer.clientHeight - 60) +
            "px)";
        }
      });
    });
  }, 200);
});
