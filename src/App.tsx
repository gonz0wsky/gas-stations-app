import React from 'react';
import useStore from '@core/store';
import {useColorModeTheme} from '@core/layout/utils/useColorModeTheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeProvider from '@core/layout';
import GestureProvider from '@core/provider/GestureProvider';
import I18nProvider from '@core/locale/i18nProvider';
import Navigator from '@core/navigation';
import {StatusBar} from 'react-native';
import {statusBarStyle} from '@core/layout/themes';
import useQueryClient from '@core/queryClient';
import QueryClientProvider from '@core/provider/QueryClientProvider';

const InnerApp = () => {
  useQueryClient();
  const themeName = useStore(s => s.theme);
  const theme = useColorModeTheme(themeName);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <GestureProvider>
          <I18nProvider>
            <Navigator />
            <StatusBar barStyle={statusBarStyle[theme]} />
          </I18nProvider>
        </GestureProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider>
      <InnerApp />
    </QueryClientProvider>
  );
};

export default App;
