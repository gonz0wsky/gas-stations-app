import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {storage} from './storage';

import createSystemSlice, {SystemSlice} from './useSystemSlice';
import createVehicleSlice, {VehicleSlice} from './useVehicleSlice';
import createStationsSlice, {StationsSlice} from './useStationsSlice';
import createLocationSlice, {LocationSlice} from './useLocationSlice';

type Slices = SystemSlice & VehicleSlice & StationsSlice & LocationSlice;

const useStore = create<Slices>()(
  persist(
    (...a) => ({
      ...createSystemSlice(...a),
      ...createVehicleSlice(...a),
      ...createStationsSlice(...a),
      ...createLocationSlice(...a),
    }),
    {
      name: 'storage',
      version: 1,
      storage: createJSONStorage(() => storage),
    },
  ),
);

export default useStore;
