import {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';

type MapStyle = 'standard';

export interface MapSlice {
  mapStyle: MapStyle;
  setMapStyle: (style: MapStyle) => void;
}

const initialState: Pick<MapSlice, 'mapStyle'> = {
  mapStyle: 'standard',
};

const createSystemSlice: StateCreator<MapSlice> = set => {
  sliceResetFns.add(() => set(() => initialState));

  return {
    ...initialState,
    setMapStyle: (style: MapStyle) => set(() => ({mapStyle: style})),
  };
};

export default createSystemSlice;
