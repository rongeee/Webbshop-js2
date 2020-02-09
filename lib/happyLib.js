HappyLib = (() => {
  const HappyLib = {
    // printError: response => {
    //   if (!response.ok) {
    //     throw Error(
    //       `Status: ${response.status}\nStatustext: ${response.statusText}\nComment: Psst, checka vad fetchen pekar på`
    //     );
    //   }
    //   return response.json();
    // },

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
    }
  };

  return HappyLib;
})();
