import * as tokens from '@core/layout/tokens';
import type {Mutable} from '@core/layout/types';

import type {SystemTheme} from './utils/useColorModeTheme';
import type {StatusBarStyle} from 'react-native';

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
  primary: tokens.color.theme_light_primary,
  secondary: tokens.color.theme_light_secondary,
  tertiary: tokens.color.theme_light_tertiary,
  high: tokens.color.theme_light_high,
  medium: tokens.color.theme_light_medium,
  low: tokens.color.theme_light_low,
} as const;

export const light = {
  name: 'light',
  palette: lightPalette,
  atoms: {
    text: {
      primary: {color: lightPalette.secondary},
      secondary: {color: lightPalette.primary},
      tertiary: {color: lightPalette.tertiary},
    },
    background: {
      primary: {backgroundColor: lightPalette.primary},
      secondary: {backgroundColor: lightPalette.secondary},
      tertiary: {backgroundColor: lightPalette.tertiary},
    },
    components: {
      button: {
        background: {
          primary: {backgroundColor: lightPalette.tertiary},
          secondary: {backgroundColor: lightPalette.secondary},
          tertiary: {backgroundColor: lightPalette.primary},
        },
        text: {
          primary: {color: lightPalette.secondary},
          secondary: {color: lightPalette.primary},
          tertiary: {color: lightPalette.tertiary},
        },
      },
      circular_button: {
        background: {
          primary: {backgroundColor: lightPalette.tertiary},
          secondary: {backgroundColor: lightPalette.secondary},
          tertiary: {backgroundColor: lightPalette.primary},
        },
        icon: {
          primary: {color: lightPalette.secondary},
          secondary: {color: lightPalette.primary},
          tertiary: {color: lightPalette.tertiary},
        },
      },
      filter: {
        background: {backgroundColor: lightPalette.tertiary},
        background_active: {backgroundColor: lightPalette.secondary},
        text: {color: lightPalette.secondary},
        text_active: {color: lightPalette.primary},
      },
      card: {
        background: {backgroundColor: lightPalette.secondary},
        title: {color: lightPalette.primary},
        subtitle: {color: lightPalette.primary},
        distance: {color: lightPalette.primary},
        price: {
          default: {color: lightPalette.primary},
          low: {color: lightPalette.low},
          medium: {color: lightPalette.medium},
          high: {color: lightPalette.high},
        },
      },
      station_detail_row: {
        icon_bg: {
          backgroundColor: lightPalette.tertiary,
          borderColor: lightPalette.secondary,
        },
        icon: {color: lightPalette.secondary},
        title: {color: lightPalette.secondary},
        subtitle: {color: lightPalette.secondary},
      },
      spacer: {
        primary: {backgroundColor: lightPalette.primary},
        secondary: {backgroundColor: lightPalette.secondary},
        tertiary: {backgroundColor: lightPalette.tertiary},
      },
      map: {
        marker: {
          favorite: {color: lightPalette.primary},
          price: {
            low: {color: lightPalette.low},
            medium: {color: lightPalette.medium},
            high: {color: lightPalette.high},
          },
        },
      },
      section_title: {
        background: {backgroundColor: lightPalette.primary},
        text: {color: lightPalette.secondary},
      },
      settings_option: {
        background: {backgroundColor: lightPalette.secondary},
        title: {color: lightPalette.tertiary},
        subtitle: {color: lightPalette.primary},
        icon: {color: lightPalette.tertiary},
      },
      options_list: {
        background: {backgroundColor: lightPalette.primary},
        icon: {color: lightPalette.secondary},
        spacer: {backgroundColor: lightPalette.secondary},
        text: {color: lightPalette.secondary},
      },
    },
  },
};

export const dark: Theme = {
  name: 'dark',
  palette: lightPalette,
  atoms: light.atoms,
};
