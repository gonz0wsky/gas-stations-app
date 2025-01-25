import React from 'react';
import {View} from 'react-native';
import {atoms as a, useSafeArea, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';
import OptionsList from '../../layout/OptionsList';
import {SystemTheme} from '@core/layout/utils/useColorModeTheme';
import {msg} from '@lingui/core/macro';
import THEME_NAMES from '@shared/constants/names/theme-names';
import {useThemeSettingsViewModel} from './useThemeSettingsViewModel';
import {ScreenComponent} from '@core/navigation/routes/params';

const OPTIONS: Record<SystemTheme, ReturnType<typeof msg>> = THEME_NAMES;

export const ThemeSettingsView: ScreenComponent<'ThemeSettings'> = () => {
  const {handlePressBack, handlePressOption, theme} =
    useThemeSettingsViewModel();
  const {i18n} = useLingui();
  const safe = useSafeArea();
  const t = useTheme();

  const options = Object.entries(OPTIONS).map(([key, value]) => ({
    id: key,
    title: i18n.t(value),
  }));

  return (
    <View style={[a.flex_1, t.atoms.bg.primary]}>
      <Header
        title={i18n.t('Theme')}
        leftIcon="left-arrow"
        onPressLeft={handlePressBack}
      />
      <OptionsList
        data={options}
        onPress={handlePressOption}
        selected={theme}
        contentContainerStyle={[a.pb_safe(safe.bottom, 16)]}
      />
    </View>
  );
};
