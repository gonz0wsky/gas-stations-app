import {tokens} from '@core/layout/utils/getActiveBreakpoints';

export const palette = {
  black: tokens.color.theme_bird_black,
  blue: tokens.color.theme_bird_blue,
  green: tokens.color.theme_bird_green,
  pink: tokens.color.theme_bird_pink,
  red: tokens.color.theme_bird_red,
  white: tokens.color.theme_bird_white,
  yellow: tokens.color.theme_bird_yellow,
} as const;

export const theme = {
  name: 'bird',
  atoms: {
    text: {
      primary: {color: palette.blue},
      secondary: {color: palette.white},
      tertiary: {color: palette.white},
    },
    background: {
      primary: {backgroundColor: palette.white},
      secondary: {backgroundColor: palette.blue},
      tertiary: {backgroundColor: palette.pink},
    },
    components: {
      button: {
        background: {
          primary: {backgroundColor: palette.pink},
          secondary: {backgroundColor: palette.white},
          tertiary: {backgroundColor: palette.white},
        },
        text: {
          primary: {color: palette.white},
          secondary: {color: palette.white},
          tertiary: {color: palette.white},
        },
      },
      circular_button: {
        background: {
          primary: {backgroundColor: palette.yellow},
          secondary: {backgroundColor: palette.white},
          tertiary: {backgroundColor: palette.white},
        },
        icon: {
          primary: {color: palette.blue},
          secondary: {color: palette.white},
          tertiary: {color: palette.white},
        },
      },
      filter: {
        background: {backgroundColor: palette.blue},
        background_active: {backgroundColor: palette.red},
        text: {color: palette.yellow},
        text_active: {color: palette.white},
      },
      card: {
        background: {backgroundColor: palette.blue},
        title: {color: palette.yellow},
        subtitle: {color: palette.white},
        distance: {color: palette.pink},
        price: {
          default: {color: palette.white},
          low: {color: palette.green},
          medium: {color: palette.yellow},
          high: {color: palette.red},
        },
      },
      station_detail_row: {
        icon_bg: {
          backgroundColor: palette.green,
          borderColor: palette.blue,
        },
        icon: {color: palette.yellow},
        title: {color: palette.red},
        subtitle: {color: palette.blue},
      },
      spacer: {
        primary: {backgroundColor: palette.white},
        secondary: {backgroundColor: palette.white},
        tertiary: {backgroundColor: palette.white},
      },
      map: {
        marker: {
          favorite: {color: palette.pink},
          price: {
            low: {color: palette.green},
            medium: {color: palette.yellow},
            high: {color: palette.red},
          },
        },
      },
      section_title: {
        background: {backgroundColor: palette.green},
        text: {color: palette.white},
      },
      settings_option: {
        background: {backgroundColor: palette.white},
        title: {color: palette.blue},
        subtitle: {color: palette.red},
        icon: {color: palette.pink},
      },
      options_list: {
        background: {backgroundColor: palette.white},
        icon: {color: palette.pink},
        spacer: {backgroundColor: palette.green},
        text: {color: palette.red},
      },
      skeleton: {
        background: palette.blue,
        foreground: palette.pink,
      },
    },
  },
};
