import {ColorSchemeName, useColorScheme} from 'react-native';

import {ThemeName} from '../themes';

export type SystemTheme = 'system' | NonNullable<ColorSchemeName> | ThemeName;

export function useColorModeTheme(theme?: SystemTheme): ThemeName {
  const colorScheme = useColorScheme();

  return (theme === 'system' ? colorScheme : theme) || 'light';
}
