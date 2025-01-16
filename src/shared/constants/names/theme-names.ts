import {SystemTheme} from '@core/layout/utils/useColorModeTheme';
import {msg} from '@lingui/core/macro';

const THEME_NAMES: Record<SystemTheme, ReturnType<typeof msg>> = {
  dark: msg`Dark`,
  light: msg`Light`,
  system: msg`System`,
};

export default THEME_NAMES;
