import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {storage} from './storage';
import createSystemSlice, {SystemSlice} from './useSystemSlice';

type Slices = SystemSlice;

const useStore = create<Slices>()(
  persist(
    (...a) => ({
      ...createSystemSlice(...a),
    }),
    {
      name: 'storage',
      version: 1,
      storage: createJSONStorage(() => storage),
    },
  ),
);

export default useStore;
