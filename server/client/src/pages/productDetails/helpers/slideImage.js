export const slideImage = (type, active, count, setCount, pImages) => {
  if (active === count) {
    return true;
  }
  if (type === "increase") {
    if (count === pImages.length - 1) {
      setCount(0);
    } else if (count < pImages.length) {
      setCount(count + 1);
    }
  }
};
