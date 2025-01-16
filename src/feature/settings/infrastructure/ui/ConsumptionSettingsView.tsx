import React, {FC} from 'react';
import {Text, View} from 'react-native';
import type ConsumptionSettingsViewModel from './useConsumptionSettingsViewModel';
import {atoms as a, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';

const ConsumptionSettingsView: FC<
  ReturnType<typeof ConsumptionSettingsViewModel>
> = ({handlePressBack, litresPer100Km}) => {
  const {i18n} = useLingui();
  const t = useTheme();

  return (
    <View style={[a.flex_1, t.atoms.bg.primary]}>
      <Header
        title={i18n.t('Consumption')}
        leftIcon="left-arrow"
        onPressLeft={handlePressBack}
      />
      <Text>SLIDER {litresPer100Km}</Text>
    </View>
  );
};

export default ConsumptionSettingsView;
