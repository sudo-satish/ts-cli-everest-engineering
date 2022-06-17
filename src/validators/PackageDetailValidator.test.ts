import { PackageDetailValidator } from "./PackageDetailValidator"

test('validate package detail', () => {
  const validator = new PackageDetailValidator();
  expect(() => validator.validate([
    {
      packageId: 'PKG',
      packageWeight: '10',
      distance: '',
      offerCode: 'OFR001',
    }
  ])).toThrowError();

  expect(() => validator.validate([
    {
      packageId: 'PKG',
      packageWeight: '',
      distance: '20',
      offerCode: 'OFR001',
    }
  ])).toThrowError();
})
