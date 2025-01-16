import React, {FC} from 'react';
import {View} from 'react-native';
import type StationRadiusSettingsViewModel from './useStationsRadiusSettingsViewModel';
import {atoms as a, useSafeArea, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';
import OptionsList from '../layout/OptionsList';
import {msg} from '@lingui/core/macro';
import RADIUS_NAMES from '@shared/constants/names/radius-names';

const OPTIONS: Record<string, ReturnType<typeof msg>> = RADIUS_NAMES;

const StationRadiusSettingsView: FC<
  ReturnType<typeof StationRadiusSettingsViewModel>
> = ({kmToDisplay, handlePressBack, handlePressOption}) => {
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
        title={i18n.t('Stations to show')}
        leftIcon="left-arrow"
        onPressLeft={handlePressBack}
      />
      <OptionsList
        data={options}
        onPress={handlePressOption}
        selected={kmToDisplay.toString()}
        contentContainerStyle={[a.pb_safe(safe.bottom, 16)]}
      />
    </View>
  );
};

export default StationRadiusSettingsView;
