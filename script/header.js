const header = document.querySelector('.nav');

window.addEventListener('scroll', function() {
  if (window.scrollY !== 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
