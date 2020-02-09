HappyLib = (() => {
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

    updateLocalStorage: cb => {
      const tempStr = JSON.stringify(cart.products);
      localStorage.setItem(cart.key, tempStr);
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
    }
  };

  return HappyLib;
})();
