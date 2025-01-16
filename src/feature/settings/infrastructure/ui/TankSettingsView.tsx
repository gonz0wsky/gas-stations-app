import React, {FC} from 'react';
import {Text, View} from 'react-native';
import type TankSettingsViewModel from './useTankSettingsViewModel';
import {atoms as a, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';

const TankSettingsView: FC<ReturnType<typeof TankSettingsViewModel>> = ({
  handlePressBack,
  tankLitres,
}) => {
  const {i18n} = useLingui();
  const t = useTheme();

  return (
    <View style={[a.flex_1, t.atoms.bg.primary]}>
      <Header
        title={i18n.t('Tank size')}
        leftIcon="left-arrow"
        onPressLeft={handlePressBack}
      />
      <Text>SLIDER {tankLitres}</Text>
    </View>
  );
};

export default TankSettingsView;
