import type {MapStyle} from '@core/store/useMapSlice';
import {msg} from '@lingui/core/macro';

const MAP_NAMES: Record<MapStyle, ReturnType<typeof msg>> = {
  dark: msg`Dark`,
  light: msg`Light`,
  system: msg`System`,
};

export default MAP_NAMES;
