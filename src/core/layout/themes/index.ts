import type {Mutable} from '@core/layout/types';

import type {SystemTheme} from '../utils/useColorModeTheme';
import type {StatusBarStyle} from 'react-native';

import type {palette as lightPalette} from './variants/light';
import {theme as lightTheme} from './variants/light';
import {theme as darkTheme} from './variants/dark';

export type ThemeName = 'light' | 'dark';
export type ReadonlyTheme = typeof lightTheme;
export type Theme = Mutable<ReadonlyTheme>;
export type ReadonlyPalette = typeof lightPalette;
export type Palette = Mutable<ReadonlyPalette>;

export const statusBarStyle: Record<SystemTheme, StatusBarStyle> = {
  dark: 'light-content',
  light: 'dark-content',
  system: 'default',
} as const;

export const variant: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
