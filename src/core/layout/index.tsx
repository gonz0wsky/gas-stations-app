import * as themes from '@core/layout/themes';
import type {Breakpoint} from '@core/layout/tokens';
import getActiveBreakpoints from '@core/layout/utils/getActiveBreakpoints';
import React from 'react';
import {Dimensions, ScaledSize, useWindowDimensions} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

export {atoms} from '@core/layout/atoms';
export * as tokens from '@core/layout/tokens';
export * from '@core/layout/types';
export * from '@core/layout/utils/flatten';
export * from '@core/layout/utils/platform';

const Context = React.createContext<{
  breakpoints: {
    active: Breakpoint | undefined;
    gtMobile: boolean;
    gtTablet: boolean;
  };
  safearea: EdgeInsets;
  theme: themes.Theme;
  themeName: themes.ThemeName;
  window: ScaledSize;
}>({
  breakpoints: {
    active: undefined,
    gtMobile: false,
    gtTablet: false,
  },
  safearea: {top: 0, left: 0, right: 0, bottom: 0},
  theme: themes.light,
  themeName: 'light',
  window: {fontScale: 0, height: 0, scale: 0, width: 0},
});

export const ThemeProvider = ({
  children,
  theme: themeName,
}: React.PropsWithChildren<{theme: themes.ThemeName}>) => {
  const safearea = useSafeAreaInsets();
  const window = useWindowDimensions();
  const theme = themes[themeName];
  const [breakpoints, setBreakpoints] = React.useState(() =>
    getActiveBreakpoints({width: Dimensions.get('window').width}),
  );

  React.useEffect(() => {
    const listener = Dimensions.addEventListener(
      'change',
      ({window: innerWindow}) => {
        const bp = getActiveBreakpoints({width: innerWindow.width});
        if (bp.active !== breakpoints.active) {
          setBreakpoints(bp);
        }
      },
    );

    return listener.remove;
  }, [breakpoints, setBreakpoints]);

  return (
    <Context.Provider
      value={React.useMemo(
        () => ({
          themeName,
          theme,
          breakpoints,
          safearea,
          window,
        }),
        [themeName, theme, breakpoints, safearea, window],
      )}>
      {children}
    </Context.Provider>
  );
};

export function useTheme() {
  return React.useContext(Context).theme;
}

export function useBreakpoints() {
  return React.useContext(Context).breakpoints;
}

export function useSafeArea() {
  return React.useContext(Context).safearea;
}

export function useWindow() {
  return React.useContext(Context).window;
}
