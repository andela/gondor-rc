
const doSort = (A, B, ascending = true, extra = []) => {
  // create path to sort criteria
  const createPath = (base, input) => {
    const path = [...input];
    const last = path.pop();

    return path.reduce((p, k) => {
      p[k] = p[k] || {};
      return p[k];
    }, base)[last];
  };
  let a;
  let b;
  let newProp;
  if (extra.length > 1) {
    a = createPath(A, extra);
    b = createPath(B, extra);
  } else {
    newProp = extra[0];
    a = A[newProp];
    b = B[newProp];
  }
  if (newProp === "createdAt") {
    a = a.setMinutes(0, 0, 0);
    b = b.setMinutes(0, 0, 0);
  }
  if (a === null || a === "") return 1;
  if (b === null || b === "") return -1;
  if (a === b) {
    return 0;
  }
  if (ascending) {
    return a < b ? -1 : 1;
  }
  if (!ascending) {
    return a < b ? 1 : -1;
  }
  return 0;
};


const createSorter = (...args) => {
  return (A, B) => {
    let ret = 0;
    let sortPropertyPath;
    args.some(sorter => {
      const { property, ascending = true } = sorter;
      if (property === "all") {
      // ignore sorter, continue to next sorter if any
        return false;
      }
      if (property === "price") {
        sortPropertyPath = ["price", "min"];
      } else {
        sortPropertyPath = [property];
      }
      const value = doSort(A, B, ascending, sortPropertyPath);
      if (value === 0) {
        // they are equal, continue to next sorter if any
        return false;
      }
      // they are different, stop at current sorter
      ret = value;

      return true;
    });

    return ret;
  };
};

export { createSorter };
