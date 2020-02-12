const header = document.querySelector(".nav");
const body = document.querySelector("body");

window.addEventListener("scroll", function() {
  if (window.scrollY !== 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
