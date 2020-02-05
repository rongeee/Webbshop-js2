const selections = document.querySelector('#categories');

selections.addEventListener('change', function(e) {
  const userInput = e.target.value.toLowerCase();

  //Get all product containers
  let containersToHide = document.querySelectorAll(
    `.products__container--item`
  );
  // Hide all containers, we will display the relevant one after hiding
  containersToHide.forEach(item => {
    item.classList.add('hidden');
  });

  // If the user input is set to "all" every container will be changed to display block
  if (userInput === 'all') {
    containersToHide.forEach(item => {
      item.classList.remove('hidden');
    });
  }
  // If a category is selected by the user, the selected category will
  // be rendered by queryselecting the correct container with the user input string
  else {
    let container = document.querySelector(`.products__${userInput}`);
    container.classList.remove('hidden');
  }
});
