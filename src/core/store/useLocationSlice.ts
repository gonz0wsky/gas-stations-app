import type {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';

type Location = {
  latitude: number;
  longitude: number;
  origin: 'gps' | 'map';
};

export interface LocationSlice {
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
}

const initialState: Pick<LocationSlice, 'currentLocation'> = {
  currentLocation: {latitude: 37.386052, longitude: -5.984458, origin: 'gps'},
};

const createSystemSlice: StateCreator<LocationSlice> = set => {
  sliceResetFns.add(() => set(() => initialState));

  return {
    ...initialState,
    setCurrentLocation: (location: Location) =>
      set(() => ({currentLocation: location})),
  };
};

export default createSystemSlice;
