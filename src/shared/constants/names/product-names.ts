import type {ServiceStationProducts} from '@feature/stations/domain/ServiceStationModel';
import {msg} from '@lingui/core/macro';

const PRODUCT_NAMES: Record<
  keyof ServiceStationProducts,
  ReturnType<typeof msg>
> = {
  biodiesel: msg`Biodiesel`,
  bioethanol: msg`Bioethanol`,
  compressed_natural_gas: msg`Compressed natural gas`,
  diesel_a: msg`Diesel A`,
  diesel_b: msg`Diesel B`,
  diesel_premium: msg`Diesel premium`,
  gasoline_95_e10: msg`Gasoline 95 E10`,
  gasoline_95_e5: msg`Gasoline 95 E5`,
  gasoline_95_e5_premium: msg`Gasoline 95 E5 premium`,
  gasoline_98_e10: msg`Gasoline 98 E10`,
  gasoline_98_e5: msg`Gasoline 98 E5`,
  hydrogen: msg`Hydrogen`,
  liquefied_natural_gas: msg`Liquefied natural gas`,
  liquefied_petroleum_gas: msg`Liquefied petroleum gas`,
} as const;

export default PRODUCT_NAMES;
