import type {ColorSchemeName} from 'react-native';
import { useColorScheme} from 'react-native';

import type {ThemeName} from '../themes';

export type SystemTheme = 'system' | NonNullable<ColorSchemeName> | ThemeName;

export function useColorModeTheme(theme?: SystemTheme): ThemeName {
  const colorScheme = useColorScheme();

  return (theme === 'system' ? colorScheme : theme) || 'light';
}
