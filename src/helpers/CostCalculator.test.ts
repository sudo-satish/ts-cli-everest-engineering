import { CostCalculator } from "./CostCalculator";

test('invalid coupon code', () => {
  const costCalculator = new CostCalculator(100);
  costCalculator.calculateCost(5, 5, 'OFR001_INVALID');
  expect(costCalculator.discountedCost).toBe(0);
  expect(costCalculator.finalCost).toBe(175);
  expect(costCalculator.totalCost).toBe(175);
})

test('valid coupon code but not eligible', () => {
  const costCalculator = new CostCalculator(100);
  costCalculator.calculateCost(5, 5, 'OFR001');
  expect(costCalculator.discountedCost).toBe(0);
  expect(costCalculator.finalCost).toBe(175);
  expect(costCalculator.totalCost).toBe(175);
})

test('valid coupon code and eligible', () => {
  const costCalculator = new CostCalculator(100);
  costCalculator.calculateCost(10, 100, 'OFR003');
  expect(costCalculator.discountedCost).toBe(35);
  expect(costCalculator.finalCost).toBe(665);
  expect(costCalculator.totalCost).toBe(700);
})
