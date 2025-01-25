import * as tokens from '@core/layout/tokens';
import type {Mutable} from '@core/layout/types';

import {SystemTheme} from './utils/useColorModeTheme';
import {StatusBarStyle} from 'react-native';

export type ThemeName = 'light' | 'dark';
export type ReadonlyTheme = typeof light;
export type Theme = Mutable<ReadonlyTheme>;
export type ReadonlyPalette = typeof lightPalette;
export type Palette = Mutable<ReadonlyPalette>;

export const statusBarStyle: Record<SystemTheme, StatusBarStyle> = {
  dark: 'light-content',
  light: 'dark-content',
  system: 'default',
} as const;

export const lightPalette = {
  white: tokens.color.true_white,
  black: tokens.color.true_black,

  gray_25: tokens.color.gray_975,
  gray_50: tokens.color.gray_950,
  gray_100: tokens.color.gray_900,
  gray_200: tokens.color.gray_800,
  gray_300: tokens.color.gray_700,
  gray_400: tokens.color.gray_600,
  gray_500: tokens.color.gray_500,
  gray_600: tokens.color.gray_400,
  gray_700: tokens.color.gray_300,
  gray_800: tokens.color.gray_200,
  gray_900: tokens.color.gray_100,
  gray_950: tokens.color.gray_50,
  gray_975: tokens.color.gray_25,

  primary_25: tokens.color.yellow_25,
  primary_50: tokens.color.yellow_50,
  primary_100: tokens.color.yellow_100,
  primary_200: tokens.color.yellow_200,
  primary_300: tokens.color.yellow_300,
  primary_400: tokens.color.yellow_400,
  primary_500: tokens.color.yellow_500,
  primary_600: tokens.color.yellow_600,
  primary_700: tokens.color.yellow_700,
  primary_800: tokens.color.yellow_800,
  primary_900: tokens.color.yellow_900,
  primary_950: tokens.color.yellow_950,
  primary_975: tokens.color.yellow_975,

  green_25: tokens.color.green_25,
  green_50: tokens.color.green_50,
  green_100: tokens.color.green_100,
  green_200: tokens.color.green_200,
  green_300: tokens.color.green_300,
  green_400: tokens.color.green_400,
  green_500: tokens.color.green_500,
  green_600: tokens.color.green_600,
  green_700: tokens.color.green_700,
  green_800: tokens.color.green_800,
  green_900: tokens.color.green_900,
  green_950: tokens.color.green_950,
  green_975: tokens.color.green_975,

  red_25: tokens.color.red_25,
  red_50: tokens.color.red_50,
  red_100: tokens.color.red_100,
  red_200: tokens.color.red_200,
  red_300: tokens.color.red_300,
  red_400: tokens.color.red_400,
  red_500: tokens.color.red_500,
  red_600: tokens.color.red_600,
  red_700: tokens.color.red_700,
  red_800: tokens.color.red_800,
  red_900: tokens.color.red_900,
  red_950: tokens.color.red_950,
  red_975: tokens.color.red_975,

  gold_medal: tokens.color.gold_medal,
  silver_medal: tokens.color.silver_medal,
  bronze_medal: tokens.color.bronze_medal,
} as const;

export const light = {
  name: 'light',
  palette: lightPalette,
  atoms: {
    text: {
      primary: {
        color: lightPalette.gray_950,
      },
      secondary: {
        color: lightPalette.gray_100,
      },
      alt: {
        color: lightPalette.primary_500,
      },
    },
    bg: {
      primary: {
        backgroundColor: lightPalette.gray_900,
      },
    },
    modal: {
      bg: {
        primary: {
          backgroundColor: lightPalette.white,
        },
      },
      drag: {
        primary: {
          backgroundColor: lightPalette.primary_500,
        },
      },
    },
    btn: {
      bg: {
        primary: {
          backgroundColor: lightPalette.primary_500,
        },
        secondary: {
          backgroundColor: lightPalette.gray_100,
        },
        success: {
          backgroundColor: lightPalette.green_700,
        },
        error: {
          backgroundColor: lightPalette.red_500,
        },
      },
      text: {
        primary: {
          color: lightPalette.black,
        },
        secondary: {
          color: lightPalette.white,
        },
        success: {
          color: lightPalette.black,
        },
        error: {
          color: lightPalette.black,
        },
      },
    },
    round_btn: {
      bg: {
        primary: {
          backgroundColor: lightPalette.primary_500,
        },
        secondary: {
          backgroundColor: lightPalette.gray_100,
        },
        success: {
          backgroundColor: lightPalette.green_700,
        },
        error: {
          backgroundColor: lightPalette.red_500,
        },
      },
      icon: {
        primary: {
          color: lightPalette.black,
        },
        secondary: {
          color: lightPalette.white,
        },
        success: {
          color: lightPalette.black,
        },
        error: {
          color: lightPalette.black,
        },
      },
    },
    header: {
      bg: {
        backgroundColor: lightPalette.gray_400,
      },
    },
    selector: {
      bg: {
        backgroundColor: lightPalette.gray_400,
      },
      text: {
        color: lightPalette.gray_950,
      },
      selected_bg: {
        backgroundColor: lightPalette.primary_500,
      },
      selected_text: {
        color: lightPalette.gray_100,
      },
    },
    station_card: {
      bg: {
        backgroundColor: lightPalette.gray_600,
      },
      price: {
        color: lightPalette.primary_500,
      },
      price_low: {
        color: lightPalette.green_700,
      },
      price_medium: {
        color: lightPalette.primary_500,
      },
      price_high: {
        color: lightPalette.red_500,
      },
      distance: {
        color: lightPalette.gray_900,
      },
      title: {
        color: lightPalette.gray_950,
      },
      subtitle: {
        color: lightPalette.gray_100,
      },
    },
    station_detail_row: {
      icon_bg: {
        backgroundColor: lightPalette.primary_500,
        borderColor: lightPalette.primary_700,
      },
      icon: {
        color: lightPalette.gray_100,
      },
      title: {
        color: lightPalette.gray_950,
      },
      subtitle: {
        color: lightPalette.gray_100,
      },
    },
    option_navigate: {
      bg: {
        backgroundColor: lightPalette.gray_800,
      },
      text: {
        color: lightPalette.gray_950,
      },
      icon: {
        color: lightPalette.gray_950,
      },
    },
    spacer: {
      backgroundColor: lightPalette.gray_800,
    },
    map: {
      poi: {
        favorite: {
          color: lightPalette.gray_100,
        },
        price_level: {
          low: {
            color: lightPalette.green_600,
          },
          medium: {
            color: lightPalette.primary_500,
          },
          high: {
            color: lightPalette.red_500,
          },
        },
      },
    },
  },
};

export const dark: Theme = {
  name: 'dark',
  palette: lightPalette,
  atoms: light.atoms,
};
