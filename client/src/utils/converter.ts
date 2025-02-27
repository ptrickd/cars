// Converting values
// 1km = 0.6213712miles
const KM_BY_MILE = 1.609344
const MILE_BY_KM = 0.6213712

export const convertMilesToKm = (miles: number) => miles * KM_BY_MILE

export const convertKmToMiles = (kms: number) => kms * MILE_BY_KM
