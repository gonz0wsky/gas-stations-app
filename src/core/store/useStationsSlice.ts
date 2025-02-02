import type {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';

export interface StationsSlice {
  favorites: string[];
  kmToDisplay: number;
  permuteFavorite: (id: string) => void;
  setKmToDisplay: (km: number) => void;
}

const initialState: Pick<StationsSlice, 'favorites' | 'kmToDisplay'> = {
  favorites: [],
  kmToDisplay: 25,
};

const createSystemSlice: StateCreator<StationsSlice> = set => {
  sliceResetFns.add(() => set(() => initialState));

  return {
    ...initialState,

    permuteFavorite: (id: string) =>
      set(state => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter(favorite => favorite !== id)
          : [...state.favorites, id],
      })),
    setKmToDisplay: (kmToDisplay: number) => set(() => ({kmToDisplay})),
  };
};

export default createSystemSlice;
