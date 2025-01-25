import React from 'react';
import {View} from 'react-native';
import {useMapSettingsViewModel} from './useMapSettingsViewModel';
import {atoms as a, useSafeArea, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';
import {msg} from '@lingui/core/macro';
import {MapStyle} from '@core/store/useMapSlice';
import MAP_NAMES from '@shared/constants/names/map-names';
import {ScreenComponent} from '@core/navigation/routes/params';
import OptionsList from '../../layout/OptionsList';

const OPTIONS: Record<MapStyle, ReturnType<typeof msg>> = MAP_NAMES;

export const MapSettingsView: ScreenComponent<'MapSettings'> = () => {
  const {handlePressBack, handlePressOption, mapStyle} =
    useMapSettingsViewModel();
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
        title={i18n.t('Map style')}
        leftIcon="left-arrow"
        onPressLeft={handlePressBack}
      />
      <OptionsList
        data={options}
        onPress={handlePressOption}
        selected={mapStyle}
        contentContainerStyle={[a.pb_safe(safe.bottom, 16)]}
      />
    </View>
  );
};
