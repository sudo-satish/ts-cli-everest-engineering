import { Package } from "./Package";

test('Package 1', () => {
  const packageDetails = {
    packageId: 'PKG1',
    packageWeight: 5,
    distance: 5,
    offerCode: 'OFR001',
  };
  const pkg = new Package(packageDetails, 100);
  expect(pkg.toString()).toBe('PKG1 0 175');
})

test('Package 2', () => {
  const packageDetails = {
    packageId: 'PKG2',
    packageWeight: 15,
    distance: 5,
    offerCode: 'OFR002',
  };
  const pkg = new Package(packageDetails, 100);
  expect(pkg.toString()).toBe('PKG2 0 275');
})

test('Package 3', () => {
  const packageDetails = {
    packageId: 'PKG3',
    packageWeight: 10,
    distance: 100,
    offerCode: 'OFR003',
  };
  const pkg = new Package(packageDetails, 100);
  expect(pkg.toString()).toBe('PKG3 35 665');
})
