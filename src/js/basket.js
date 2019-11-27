export default function basket(purchases, applyDiscount) {
  const result = purchases.reduce(
    (sum, purchase) => sum + purchase.price * purchase.count, 0,
  );

  if (applyDiscount) {
    return result * 0.939;
  }

  return result;
}
