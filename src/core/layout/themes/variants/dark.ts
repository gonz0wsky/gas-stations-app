import {tokens} from '@core/layout/utils/getActiveBreakpoints';
import type {Palette, Theme} from '..';

const palette: Palette = {
  primary: tokens.color.theme_dark_primary,
  secondary: tokens.color.theme_dark_secondary,
  tertiary: tokens.color.theme_dark_tertiary,
  high: tokens.color.theme_dark_high,
  medium: tokens.color.theme_dark_medium,
  low: tokens.color.theme_dark_low,
} as const;

export const theme: Theme = {
  name: 'dark',
  atoms: {
    text: {
      primary: {color: palette.secondary},
      secondary: {color: palette.primary},
      tertiary: {color: palette.tertiary},
    },
    background: {
      primary: {backgroundColor: palette.primary},
      secondary: {backgroundColor: palette.secondary},
      tertiary: {backgroundColor: palette.tertiary},
    },
    components: {
      button: {
        background: {
          primary: {backgroundColor: palette.tertiary},
          secondary: {backgroundColor: palette.secondary},
          tertiary: {backgroundColor: palette.primary},
        },
        text: {
          primary: {color: palette.primary},
          secondary: {color: palette.primary},
          tertiary: {color: palette.tertiary},
        },
      },
      circular_button: {
        background: {
          primary: {backgroundColor: palette.tertiary},
          secondary: {backgroundColor: palette.secondary},
          tertiary: {backgroundColor: palette.primary},
        },
        icon: {
          primary: {color: palette.primary},
          secondary: {color: palette.primary},
          tertiary: {color: palette.tertiary},
        },
      },
      filter: {
        background: {backgroundColor: palette.tertiary},
        background_active: {backgroundColor: palette.secondary},
        text: {color: palette.primary},
        text_active: {color: palette.primary},
      },
      card: {
        background: {backgroundColor: palette.secondary},
        title: {color: palette.primary},
        subtitle: {color: palette.primary},
        distance: {color: palette.primary},
        price: {
          default: {color: palette.primary},
          low: {color: palette.low},
          medium: {color: palette.medium},
          high: {color: palette.high},
        },
      },
      station_detail_row: {
        icon_bg: {
          backgroundColor: palette.secondary,
          borderColor: palette.primary,
        },
        icon: {color: palette.primary},
        title: {color: palette.secondary},
        subtitle: {color: palette.secondary},
      },
      spacer: {
        primary: {backgroundColor: palette.primary},
        secondary: {backgroundColor: palette.secondary},
        tertiary: {backgroundColor: palette.tertiary},
      },
      map: {
        marker: {
          favorite: {color: palette.primary},
          price: {
            low: {color: palette.low},
            medium: {color: palette.medium},
            high: {color: palette.high},
          },
        },
      },
      section_title: {
        background: {backgroundColor: palette.secondary},
        text: {color: palette.primary},
      },
      settings_option: {
        background: {backgroundColor: palette.primary},
        title: {color: palette.secondary},
        subtitle: {color: palette.secondary},
        icon: {color: palette.secondary},
      },
      options_list: {
        background: {backgroundColor: palette.primary},
        icon: {color: palette.secondary},
        spacer: {backgroundColor: palette.secondary},
        text: {color: palette.secondary},
      },
      skeleton: {
        background: palette.secondary,
        foreground: palette.tertiary,
      },
    },
  },
};
