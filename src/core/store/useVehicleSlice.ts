import {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';
import type {ServiceStationProducts} from '@feature/stations/domain/ServiceStationModel';

export interface VehicleSlice {
  fuel: keyof ServiceStationProducts;
  litresPer100Km: number;
  tankLitres: number;
  setFuel: (product: keyof ServiceStationProducts) => void;
  setLitresPer100Km: (litres: number) => void;
  setTankLitres: (litres: number) => void;
}

const initialState: Pick<
  VehicleSlice,
  'fuel' | 'tankLitres' | 'litresPer100Km'
> = {
  fuel: 'gasoline_95_e5',
  litresPer100Km: 6,
  tankLitres: 45,
};

const createSystemSlice: StateCreator<VehicleSlice> = set => {
  sliceResetFns.add(() => set(() => initialState));

  return {
    ...initialState,
    setFuel: (fuel: keyof ServiceStationProducts) => set(() => ({fuel})),
    setLitresPer100Km: (litresPerKm: number) =>
      set(() => ({litresPer100Km: litresPerKm})),
    setTankLitres: (tankLitres: number) => set(() => ({tankLitres})),
  };
};

export default createSystemSlice;
