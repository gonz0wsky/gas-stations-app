import {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';
import ServiceStationProducts from '@feature/stations/domain/ServiceStationProductsModel';

export interface VehicleSlice {
  fuel: keyof ServiceStationProducts;
  litresPerKm: number;
  tankLitres: number;
  setFuel: (product: keyof ServiceStationProducts) => void;
  setLitresPerKm: (litres: number) => void;
  setTankLitres: (litres: number) => void;
}

const initialState: Pick<VehicleSlice, 'fuel' | 'tankLitres' | 'litresPerKm'> =
  {
    fuel: 'gasoline_95_e5',
    litresPerKm: 6,
    tankLitres: 45,
  };

const createSystemSlice: StateCreator<VehicleSlice> = set => {
  sliceResetFns.add(() => set(() => initialState));

  return {
    ...initialState,
    setFuel: (fuel: keyof ServiceStationProducts) => set(() => ({fuel})),
    setLitresPerKm: (litresPerKm: number) => set(() => ({litresPerKm})),
    setTankLitres: (tankLitres: number) => set(() => ({tankLitres})),
  };
};

export default createSystemSlice;
