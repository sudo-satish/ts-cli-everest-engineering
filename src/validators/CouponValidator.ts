interface CouponConfig {
  [key: string]: {
    discount: number,
    distance: {
      min: number,
      max: number
    },
    weight: {
      min: number,
      max: number
    }
  }
}

/**
 * In real application this will be fetched from DB.
 */
const CouponConfig: CouponConfig = {
  'OFR001': {
    discount: 10,
    distance: {
      min: 0,
      max: 200
    },
    weight: {
      min: 70,
      max: 200
    }
  },
  'OFR002': {
    discount: 7,
    distance: {
      min: 50,
      max: 150
    },
    weight: {
      min: 100,
      max: 250
    }
  },
  'OFR003': {
    discount: 5,
    distance: {
      min: 50,
      max: 250
    },
    weight: {
      min: 10,
      max: 150
    }
  },
};

/**
 * A class to validate given coupon for given price and distance
 */
export class CouponValidator {
  /**
   * 
   * @param distance distance in KM
   * @param weight weight of package in KG
   * @param coupon coupon code
   * @returns percentage of discount applied, if coupon is not valid it returns 0;
   */
  validate(distance: number, weight: number, coupon: string): number {
    const couponConfig = CouponConfig[coupon];
    if (!couponConfig) {
      return 0;
    }

    const {distance: distanceConfig, weight: weightConfig, discount} = couponConfig;
    if (
      distance >= distanceConfig.min &&
      distance <= distanceConfig.max &&
      weight >= weightConfig.min &&
      weight <= weightConfig.max
    ) {
      return discount;
    }
    return 0;
  }
}