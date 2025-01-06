import {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';
import ServiceStationPrices from '@feature/stations/domain/ServiceStationPricesModel';

export interface VehicleSlice {
  fuel: keyof ServiceStationPrices;
  litresPerKm: number;
  tankLitres: number;
  setFuel: (product: keyof ServiceStationPrices) => void;
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
    setFuel: (fuel: keyof ServiceStationPrices) => set(() => ({fuel})),
    setLitresPerKm: (litresPerKm: number) => set(() => ({litresPerKm})),
    setTankLitres: (tankLitres: number) => set(() => ({tankLitres})),
  };
};

export default createSystemSlice;
