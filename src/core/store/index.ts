import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {storage} from './storage';

import createSystemSlice, {SystemSlice} from './useSystemSlice';
import createVehicleSlice, {VehicleSlice} from './useVehicleSlice';
import createStationsSlice, {StationsSlice} from './useStationsSlice';
import createLocationSlice, {LocationSlice} from './useLocationSlice';
import createMapSlice, {MapSlice} from './useMapSlice';

type Slices = SystemSlice &
  VehicleSlice &
  StationsSlice &
  LocationSlice &
  MapSlice;

export const useStore = create<Slices>()(
  persist(
    (...a) => ({
      ...createSystemSlice(...a),
      ...createVehicleSlice(...a),
      ...createStationsSlice(...a),
      ...createLocationSlice(...a),
      ...createMapSlice(...a),
    }),
    {
      name: 'storage',
      version: 1,
      storage: createJSONStorage(() => storage),
    },
  ),
);
