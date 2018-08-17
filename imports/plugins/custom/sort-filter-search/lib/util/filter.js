const filterByPrice = (products, limits) => {
  // for 1000 and above, one item sits in the limits array
  if (!limits[1]) {
    return products.filter((product) => {
      if (product.price) {
        if (product.price.max >= limits[0]) {
          return product;
        }
      }
    });
  }
  return products.filter((product) => {
    if (product.price) {
      if (product.price.min >= limits[0] && product.price.max <= limits[1]) {
        return product;
      }
    }
  });
};

export { filterByPrice };
