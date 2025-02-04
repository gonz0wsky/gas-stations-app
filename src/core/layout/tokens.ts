export const color = {
  theme_light_primary: '#e2e1d7',
  theme_light_secondary: '#1b384e',
  theme_light_tertiary: '#6aba37',
  theme_light_high: '#b02e1a',
  theme_light_medium: '#d6a62b',
  theme_light_low: '#4f8a2f',

  theme_dark_primary: '#1b1c1a',
  theme_dark_secondary: '#a2b8cc',
  theme_dark_tertiary: '#8cd95a',
  theme_dark_high: '#e0503f',
  theme_dark_medium: '#e0b13e',
  theme_dark_low: '#6aba37',
} as const;

export const space = {
  _2xs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  _2xl: 24,
  _3xl: 28,
  _4xl: 32,
  _5xl: 40,
  auto: 'auto',
} as const;

export const fontSize = {
  _2xs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  _2xl: 22,
  _3xl: 24,
  _4xl: 26,
  _5xl: 32,
  _6xl: 40,
} as const;

export const lineHeight = {
  none: 1,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const borderRadius = {
  _2xs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  full: 999,
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
} as const;

export const breakpoints: {
  [key: string]: number;
} = {
  gtMobile: 800,
  gtTablet: 1200,
} as const;

export const font = {
  black: 'HostGrotesk-Black',
  black_italic: 'HostGrotesk-BlackItalic',
  bold: 'HostGrotesk-Bold',
  bold_italic: 'HostGrotesk-BoldItalic',
  italic: 'HostGrotesk-Italic',
  light: 'HostGrotesk-Light',
  light_italic: 'HostGrotesk-LightItalic',
  medium: 'HostGrotesk-Medium',
  medium_italic: 'HostGrotesk-MediumItalic',
  regular: 'HostGrotesk-Regular',
} as const;

export type Color = keyof typeof color;
export type Space = keyof typeof space;
export type FontSize = keyof typeof fontSize;
export type LineHeight = keyof typeof lineHeight;
export type BorderRadius = keyof typeof borderRadius;
export type FontWeight = keyof typeof fontWeight;
export type Breakpoint = keyof typeof breakpoints;
export type Font = keyof typeof font;
