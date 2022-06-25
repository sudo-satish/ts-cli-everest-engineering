import { TimeEstimationCLI } from "./TimeEstimationCLI";

test('getPackageDetailsFromString()', () => {
  const packageDetailsString = [
    "PKG1 50 30 OFR001",
    "PKG2 75 125 OFR008",
    "PKG3 175 100 OFR003",
    "PKG4 110 60 OFR002",
    "PKG5 155 95 NA",
  ];
  const timeEstimationCLI = new TimeEstimationCLI();
  const packageDetailsArr = timeEstimationCLI.getPackageDetailsFromString(packageDetailsString);
  expect(packageDetailsArr.length).toBe(5);
  expect(packageDetailsArr[0].distance).toBe('30');
  expect(packageDetailsArr[0].packageWeight).toBe('50');
  expect(packageDetailsArr[0].offerCode).toBe('OFR001');
})

test('getVehicleDetailsFromString()', () => {
  const vehicleDetailsString = "2 70 200";
  const timeEstimationCLI = new TimeEstimationCLI();
  const vehicleDetails = timeEstimationCLI.getVehicleDetailsFromString(vehicleDetailsString);
  expect(vehicleDetails.maxCarriableWeight).toBe('200');
  expect(vehicleDetails.maxSpeed).toBe('70');
  expect(vehicleDetails.noOfVehicle).toBe('2');
})

test('calculateTime()', () => {
  const packages = '5';
  const baseFare = '100';

  const packageDetailsString = [
    "PKG1 50 30 OFR001",
    "PKG2 75 125 OFR008",
    "PKG3 175 100 OFR003",
    "PKG4 110 60 OFR002",
    "PKG5 155 95 NA",
  ];
  const vehicleDetailsString = "2 70 200";
  
  const timeEstimationCLI = new TimeEstimationCLI();
  const packageArr = timeEstimationCLI.calculateTime({
    packages, baseFare, packageDetailsString, vehicleDetailsString
  });
  expect(packageArr.length).toBe(5);
  expect(packageArr[0].toString()).toBe('PKG1 0 750');
  expect(packageArr[0].toStringWithTime()).toBe('PKG1 0 750 4');
})
