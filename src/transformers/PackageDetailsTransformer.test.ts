import { PackageDetailsTransformer } from "./PackageDetailsTransformer";

test('transform the package details', () => {
  const transformer = new PackageDetailsTransformer();
  const transformedPackage = transformer.transform([
    {
      packageId: 'PKG',
      packageWeight: '10',
      distance: '15',
      offerCode: 'OFR001',
    }
  ]);

  expect(transformedPackage.length).toBe(1);
  expect(typeof transformedPackage[0].packageWeight).toBe("number");
  expect(typeof transformedPackage[0].distance).toBe("number");
});