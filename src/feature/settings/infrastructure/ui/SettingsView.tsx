import React, {FC} from 'react';
import {View} from 'react-native';
import type SettingsViewModel from './useSettingsViewModel';
import {atoms as a} from '@core/layout';
import Header from '@shared/ui/component/Header';

const SettingsView: FC<ReturnType<typeof SettingsViewModel>> = ({
  onPressBack,
  i18n,
}) => (
  <View style={[a.flex_1]}>
    <Header
      title={i18n.t('Settings')}
      leftIcon="left-arrow"
      onPressLeft={onPressBack}
    />
  </View>
);

export default SettingsView;
