import basket from '../src/js/basket';

test.each([
  ['many', [
    {
      id: 1,
      title: 'Велосипед',
      price: 11000,
      count: 2,
    },
    {
      id: 2,
      title: 'Футбольный мяч',
      price: 2500,
      count: 6,
    },
  ], 37000],
  ['zero', [], 0],
  ['one', [
    {
      id: 1,
      title: 'Велосипед',
      price: 11000,
      count: 2,
    },
  ], 22000],
])(('Basket %s'), (title, purchases, expectedSum) => {
  expect(basket(purchases)).toBe(expectedSum);
});

test('Basket discount', () => {
  const purchases = [
    {
      id: 1,
      title: 'Велосипед',
      price: 11,
      count: 2,
    },
    {
      id: 2,
      title: 'Футбольный мяч',
      price: 25,
      count: 6,
    },
  ];

  expect(basket(purchases, true)).toBeCloseTo(161.508);
});
