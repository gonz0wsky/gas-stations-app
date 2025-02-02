import React from 'react';
import {View} from 'react-native';
import {atoms as a, useSafeArea, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';
import OptionsList from '../../layout/OptionsList';
import {msg} from '@lingui/core/macro';
import PRODUCT_NAMES from '@shared/constants/names/product-names';
import {ServiceStationProducts} from '@feature/stations/domain/ServiceStationModel';
import {useUserVehicleFuelSettingsViewModel} from './useUserVehicleFuelSettingsViewModel';
import {ScreenComponent} from '@core/navigation/routes/params';

const OPTIONS: Record<
  keyof ServiceStationProducts,
  ReturnType<typeof msg>
> = PRODUCT_NAMES;

export const UserVehicleFuelSettingsView: ScreenComponent<
  'UserVehicleFuelSettings'
> = () => {
  const {handlePressBack, handlePressOption, fuel} =
    useUserVehicleFuelSettingsViewModel();
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
        title={i18n.t('Fuel')}
        leftIcon="left-arrow"
        onPressLeft={handlePressBack}
      />
      <OptionsList
        data={options}
        onPress={handlePressOption}
        selected={fuel}
        contentContainerStyle={[a.pb_safe(safe.bottom, 16)]}
      />
    </View>
  );
};
