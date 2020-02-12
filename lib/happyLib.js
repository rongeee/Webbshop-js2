HappyLib = (() => {
  const version = "v0.1";
  const description =
    "Nice-to-have functions when handling a cart with localStorage and *.json-data.";
  const author = "Patric Ronge & Samuel Mårtensson";

  const HappyLib = {
    loadProducts: (url, cb) => {
      fetch(url)
        .then(resp => resp.json())
        .then(data => cb(data))
        .catch(err => {
          console.log(err);
        });
    },

    addEvents: (element, func, type) => {
      element.forEach(e => {
        e.addEventListener(type, e => {
          func(e);
        });
      });
    },

    findProduct: (name, db) => {
      let foundProduct = db.products.filter(item => {
        if (name === item.name) {
          return item;
        }
      });
      return foundProduct[0];
    },

    localStorageInit: key => {
      let products = localStorage.getItem(key);
      if (products) {
        cart.products = JSON.parse(products);
        return true;
      }
    },

    updateLocalStorage: (key, cb) => {
      const tempStr = JSON.stringify(cart.products);
      localStorage.setItem(key, tempStr);
      if (cb) {
        cb();
      }
    },

    getTotalPrice: items => {
      let price = 0;
      items.forEach(item => {
        price += item.price * item.quantity;
      });
      return price;
    },

    getTotalQty: items => {
      let total = 0;

      items.forEach(item => {
        total += parseInt(item.quantity);
      });
      return total;
    }
  };

  return HappyLib;
})();
