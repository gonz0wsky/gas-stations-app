import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {storage} from './storage';

import type {SystemSlice} from './useSystemSlice';
import createSystemSlice from './useSystemSlice';
import type {VehicleSlice} from './useVehicleSlice';
import createVehicleSlice from './useVehicleSlice';
import type {StationsSlice} from './useStationsSlice';
import createStationsSlice from './useStationsSlice';
import type {LocationSlice} from './useLocationSlice';
import createLocationSlice from './useLocationSlice';
import type {MapSlice} from './useMapSlice';
import createMapSlice from './useMapSlice';

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
