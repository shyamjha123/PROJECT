export const totalCost = () => {
  let totalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.forEach(item => {
    totalCost += item.quantitiy * item.price;
  });
  return totalCost;
};
