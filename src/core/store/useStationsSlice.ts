import {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';

export interface StationsSlice {
  favorites: string[];
  kmToDisplay: number;
  setFavorites: (favorites: string[]) => void;
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

    setFavorites: (favorites: string[]) => set(() => ({favorites})),
    setKmToDisplay: (kmToDisplay: number) => set(() => ({kmToDisplay})),
  };
};

export default createSystemSlice;
