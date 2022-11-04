export const calculateDiscount = (product) => {
  const { discountPercentage, price } = product;

  const newPrice = price - (discountPercentage * price) / 100;

  return Math.round(newPrice);
};
