const YELLOW_HUE = 49;
const GREEN_HUE = 120;
const RED_HUE = 10;
const BLACK_LIGHTNESS_HUE = 49;

export const color = {
  true_black: '#000000',
  true_white: '#ffffff',

  gray_0: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 100%)`,
  gray_25: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 97%)`,
  gray_50: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 95%)`,
  gray_100: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 90%)`,
  gray_200: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 80%)`,
  gray_300: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 70%)`,
  gray_400: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 60%)`,
  gray_500: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 50%)`,
  gray_600: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 42%)`,
  gray_700: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 34%)`,
  gray_800: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 26%)`,
  gray_900: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 18%)`,
  gray_950: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 10%)`,
  gray_975: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 7%)`,
  gray_1000: `hsl(${BLACK_LIGHTNESS_HUE}, 20%, 4%)`,

  yellow_25: `hsl(${YELLOW_HUE}, 84%, 97%)`,
  yellow_50: `hsl(${YELLOW_HUE}, 84%, 95%)`,
  yellow_100: `hsl(${YELLOW_HUE}, 84%, 90%)`,
  yellow_200: `hsl(${YELLOW_HUE}, 84%, 80%)`,
  yellow_300: `hsl(${YELLOW_HUE}, 84%, 70%)`,
  yellow_400: `hsl(${YELLOW_HUE}, 84%, 60%)`,
  yellow_500: `hsl(${YELLOW_HUE}, 84%, 53%)`,
  yellow_600: `hsl(${YELLOW_HUE}, 84%, 42%)`,
  yellow_700: `hsl(${YELLOW_HUE}, 84%, 34%)`,
  yellow_800: `hsl(${YELLOW_HUE}, 84%, 26%)`,
  yellow_900: `hsl(${YELLOW_HUE}, 84%, 18%)`,
  yellow_950: `hsl(${YELLOW_HUE}, 84%, 10%)`,
  yellow_975: `hsl(${YELLOW_HUE}, 84%, 7%)`,

  green_25: `hsl(${GREEN_HUE}, 84%, 97%)`,
  green_50: `hsl(${GREEN_HUE}, 84%, 95%)`,
  green_100: `hsl(${GREEN_HUE}, 84%, 90%)`,
  green_200: `hsl(${GREEN_HUE}, 84%, 80%)`,
  green_300: `hsl(${GREEN_HUE}, 84%, 70%)`,
  green_400: `hsl(${GREEN_HUE}, 84%, 60%)`,
  green_500: `hsl(${GREEN_HUE}, 84%, 53%)`,
  green_600: `hsl(${GREEN_HUE}, 84%, 42%)`,
  green_700: `hsl(${GREEN_HUE}, 84%, 34%)`,
  green_800: `hsl(${GREEN_HUE}, 84%, 26%)`,
  green_900: `hsl(${GREEN_HUE}, 84%, 18%)`,
  green_950: `hsl(${GREEN_HUE}, 84%, 10%)`,
  green_975: `hsl(${GREEN_HUE}, 84%, 7%)`,

  red_25: `hsl(${RED_HUE}, 84%, 97%)`,
  red_50: `hsl(${RED_HUE}, 84%, 95%)`,
  red_100: `hsl(${RED_HUE}, 84%, 90%)`,
  red_200: `hsl(${RED_HUE}, 84%, 80%)`,
  red_300: `hsl(${RED_HUE}, 84%, 70%)`,
  red_400: `hsl(${RED_HUE}, 84%, 60%)`,
  red_500: `hsl(${RED_HUE}, 84%, 53%)`,
  red_600: `hsl(${RED_HUE}, 84%, 42%)`,
  red_700: `hsl(${RED_HUE}, 84%, 34%)`,
  red_800: `hsl(${RED_HUE}, 84%, 26%)`,
  red_900: `hsl(${RED_HUE}, 84%, 18%)`,
  red_950: `hsl(${RED_HUE}, 84%, 10%)`,
  red_975: `hsl(${RED_HUE}, 84%, 7%)`,

  gold_medal: '#FFD700',
  silver_medal: '#C0C0C0',
  bronze_medal: '#CD7F32',
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
