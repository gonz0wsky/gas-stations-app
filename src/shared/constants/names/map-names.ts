import {MapStyle} from '@core/store/useMapSlice';
import {msg} from '@lingui/core/macro';

const MAP_NAMES: Record<MapStyle, ReturnType<typeof msg>> = {
  standard: msg`Standard`,
};

export default MAP_NAMES;
