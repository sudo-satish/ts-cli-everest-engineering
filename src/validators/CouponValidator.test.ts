import { CouponValidator } from "./CouponValidator";

test('validate coupon', () => {
  const validator = new CouponValidator();
  const discountPercentage1 = validator.validate(10, 20, 'INVALID');
  expect(discountPercentage1).toBe(0);
  
  const discountPercentage2 = validator.validate(10, 150, 'OFR001');
  expect(discountPercentage2).toBe(10);
  
  const discountPercentage3 = validator.validate(50, 100, 'OFR002');
  expect(discountPercentage3).toBe(7);
})
