export type ServiceStation = {
  address: string;
  id: string;
  locality: string;
  municipality: string;
  name: string;
  position: {latitude: number; longitude: number};
  postalCode: string;
  products: ServiceStationProducts;
  province: string;
  saleType: 'public' | 'private';
  schedule: string;
  sideRoad: 'left' | 'right' | undefined;
};

export type ServiceStationProducts = {
  biodiesel: number | null;
  bioethanol: number | null;
  compressed_natural_gas: number | null;
  diesel_a: number | null;
  diesel_b: number | null;
  diesel_premium: number | null;
  gasoline_95_e10: number | null;
  gasoline_95_e5_premium: number | null;
  gasoline_95_e5: number | null;
  gasoline_98_e10: number | null;
  gasoline_98_e5: number | null;
  hydrogen: number | null;
  liquefied_natural_gas: number | null;
  liquefied_petroleum_gas: number | null;
};
