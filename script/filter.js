const selections = document.querySelectorAll(".filter-container");
const btns = document.querySelectorAll(".filter-radio-btn");
const resetBtn = document.querySelector(".filter-reset");
const allContainers = document.querySelectorAll(`.products__container--item`);

// Used in DOMContentLoaded-event in cart.js. Radios doesn't seem to reset on page refresh
const resetRadios = () => {
  btns.forEach(element => {
    element.checked = false;

    allContainers.forEach(cont => {
      if (cont.classList.contains("hidden")) {
        cont.classList.remove("hidden");
      }
    });
  });
};

// hehehe namn
const checkCheckboxes = () => {
  btns.forEach(btn => {
    let btnValue = btn.value.toLowerCase();
    let container = document.querySelector(`.products__${btnValue}`);

    if (btn.checked) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  });
};

btns.forEach(element => {
  element.addEventListener("click", function(e) {
    const userInput = e.target.value.toLowerCase();

    let container = document.querySelector(`.products__${userInput}`);

    allContainers.forEach(item => {
      item.classList.add("hidden");
    });

    checkCheckboxes();
  });
});

resetBtn.addEventListener("click", function(e) {
  e.preventDefault();
  resetRadios();
});
