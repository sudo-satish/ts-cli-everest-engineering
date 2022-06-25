import { Package } from "../models/Package";
import { VehicleManager } from "./VehicleManager";

test('calculateTime()', () => {
  const vehicleManager = new VehicleManager();
  const baseDeliveryCost = 100;
  const packageArr = [
    new Package({ packageId: 'PKG1', packageWeight: 50, distance: 30, offerCode: 'OFR001'}, baseDeliveryCost),
    new Package({ packageId: 'PKG2', packageWeight: 75, distance: 125, offerCode: 'OFR008'}, baseDeliveryCost),
    new Package({ packageId: 'PKG3', packageWeight: 175, distance: 100, offerCode: 'OFR003'}, baseDeliveryCost),
    new Package({ packageId: 'PKG4', packageWeight: 110, distance: 60, offerCode: 'OFR003'}, baseDeliveryCost),
    new Package({ packageId: 'PKG5', packageWeight: 155, distance: 95, offerCode: 'NA'}, baseDeliveryCost),
  ];
  vehicleManager.calculateTime(packageArr, { noOfVehicle: 2, maxSpeed: 70, maxCarriableWeight: 200 });
  expect(packageArr[0].toStringWithTime()).toBe('PKG1 0 750 4')
})

test('getCombinations()', () => {
  const vehicleManager = new VehicleManager();
  const baseDeliveryCost = 200;
  const packageArr = [
    new Package({ packageId: 'PKG1', packageWeight: 50, distance: 530, offerCode: 'OFR001'}, baseDeliveryCost),
    new Package({ packageId: 'PKG2', packageWeight: 75, distance: 125, offerCode: 'OFR008'}, baseDeliveryCost),
    new Package({ packageId: 'PKG3', packageWeight: 175, distance: 100, offerCode: 'OFR003'}, baseDeliveryCost),
    new Package({ packageId: 'PKG4', packageWeight: 110, distance: 100, offerCode: 'OFR003'}, baseDeliveryCost),
    new Package({ packageId: 'PKG5', packageWeight: 155, distance: 95, offerCode: 'NA'}, baseDeliveryCost),
  ];
  const maxSum = 200;
  const combination = vehicleManager.getCombinations(packageArr, maxSum);
  expect(combination.length).toBe(2);
  const pkgArr = combination.map((pkg => pkg.packageDetails.packageId));
  expect(pkgArr).toContain('PKG2');
  expect(pkgArr).toContain('PKG4');
})

test('getPairs()', () => {
  const vehicleManager = new VehicleManager();
  const baseDeliveryCost = 200;
  const packageArr = [
    new Package({ packageId: 'PKG1', packageWeight: 50, distance: 530, offerCode: 'OFR001'}, baseDeliveryCost),
    new Package({ packageId: 'PKG2', packageWeight: 75, distance: 125, offerCode: 'OFR008'}, baseDeliveryCost),
    new Package({ packageId: 'PKG3', packageWeight: 175, distance: 100, offerCode: 'OFR003'}, baseDeliveryCost),
    new Package({ packageId: 'PKG4', packageWeight: 110, distance: 100, offerCode: 'OFR003'}, baseDeliveryCost),
    new Package({ packageId: 'PKG5', packageWeight: 155, distance: 95, offerCode: 'NA'}, baseDeliveryCost),
  ];
  const maxSum = 200;
  const combination = vehicleManager.getPairs(packageArr, maxSum);
  expect(combination.length).toBe(4);
  expect(combination[0].length).toBe(2);
  expect(combination[1][0].packageDetails.packageId).toBe('PKG3');
})

test('getPackageWeight()', () => {
  const vehicleManager = new VehicleManager();
  const baseDeliveryCost = 200;
  const packageArr = [
    new Package({ packageId: 'PKG1', packageWeight: 50, distance: 530, offerCode: 'OFR001'}, baseDeliveryCost),
    new Package({ packageId: 'PKG2', packageWeight: 75, distance: 125, offerCode: 'OFR008'}, baseDeliveryCost),
  ];
  const weightSum = vehicleManager.getPackageWeight(packageArr);
  expect(weightSum).toBe(125);
})
