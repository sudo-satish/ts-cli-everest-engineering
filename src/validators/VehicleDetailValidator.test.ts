import { VehicleDetailValidator } from "./VehicleDetailValidator";

test('validate vehicle details', () => {
  const validator = new VehicleDetailValidator();
  expect(() => validator.validate({
    maxCarriableWeight: '',
    maxSpeed: '',
    noOfVehicle: '',
  })).toThrowError();

  expect(() => validator.validate({
    maxCarriableWeight: '20',
    maxSpeed: '30',
    noOfVehicle: '',
  })).toThrowError();

  validator.validate({
    maxCarriableWeight: '20',
    maxSpeed: '30',
    noOfVehicle: '40',
  })
})
