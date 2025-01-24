import {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';

export type MapStyle = 'system' | 'light' | 'dark';

export interface MapSlice {
  mapStyle: MapStyle;
  setMapStyle: (style: MapStyle) => void;
}

const initialState: Pick<MapSlice, 'mapStyle'> = {
  mapStyle: 'system',
};

const createSystemSlice: StateCreator<MapSlice> = set => {
  sliceResetFns.add(() => set(() => initialState));

  return {
    ...initialState,
    setMapStyle: (style: MapStyle) => set(() => ({mapStyle: style})),
  };
};

export default createSystemSlice;
