import { CostEstimationCLI } from "./CostEstimationCLI";

test('getPackageDetailsFromString()', () => {
  const packageDetailsString = [
    "PKG1 50 30 OFR001",
    "PKG2 75 125 OFR008",
    "PKG3 175 100 OFR003",
    "PKG4 110 60 OFR002",
    "PKG5 155 95 NA",
  ];
  const costEstimationCLI = new CostEstimationCLI();
  const packageDetailsArr = costEstimationCLI.getPackageDetailsFromString(packageDetailsString);
  expect(packageDetailsArr.length).toBe(5);
  expect(packageDetailsArr[0].distance).toBe('30');
  expect(packageDetailsArr[0].packageWeight).toBe('50');
  expect(packageDetailsArr[0].offerCode).toBe('OFR001');
})

test('calculateDeliveryCost()', () => {
  const packages = '5';
  const baseFare = '100';

  const packageDetailsString = [
    "PKG1 50 30 OFR001",
    "PKG2 75 125 OFR008",
    "PKG3 175 100 OFR003",
    "PKG4 110 60 OFR002",
    "PKG5 155 95 NA",
  ];
  
  const costEstimationCLI = new CostEstimationCLI();
  const packageArr = costEstimationCLI.calculateDeliveryCost({
    packages, baseFare, packageDetailsString
  });
  expect(packageArr.length).toBe(5);
  expect(packageArr[0].toString()).toBe('PKG1 0 750');
})
