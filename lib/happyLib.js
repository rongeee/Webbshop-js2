HappyLib = function() {
  const description =
    "Helper functions for handling a local webshop using localstorage.";
  const author = "Patric Ronge & Samuel Mårtensson";
  const version = "v0.0.1";

  const HappyLib = {
    printError: response => {
      if (!response.ok) {
        throw Error(
          `Status: ${response.status}\nStatustext: ${response.statusText}\nComment: Psst, checka vad fetchen pekar på`
        );
      }
      return response.json();
    },

    loadProducts: (url, arr) => {
      fetch(url)
        .then(handleErrors)
        .then(data => {
          data.products.forEach(item => {
            arr.products.push(item);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};
