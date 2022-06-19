import { VehicleDetailsTransformer } from "./VehicleDetailsTransformer";

test('transform the vehicle details', () => {
  const transformer = new VehicleDetailsTransformer();
  const transformedVehicle = transformer.transform({
    maxCarriableWeight: '10',
    maxSpeed: '20',
    noOfVehicle: '30',
  });

  expect(typeof transformedVehicle.maxCarriableWeight).toBe("number");
  expect(typeof transformedVehicle.maxSpeed).toBe("number");
  expect(typeof transformedVehicle.noOfVehicle).toBe("number");
});
