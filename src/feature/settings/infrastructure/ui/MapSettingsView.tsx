import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import type MapSettingsViewModel from './useMapSettingsViewModel';
import {atoms as a, useSafeArea, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';

const MapSettingsView: FC<ReturnType<typeof MapSettingsViewModel>> = ({
  onPressBack,
}) => {
  const {i18n} = useLingui();
  const t = useTheme();
  const safe = useSafeArea();

  return (
    <View style={[a.flex_1]}>
      <Header
        title={i18n.t('Map style')}
        leftIcon="left-arrow"
        onPressLeft={onPressBack}
      />
      <ScrollView
        style={[t.atoms.bg.primary]}
        contentContainerStyle={[a.pt_sm, a.pb_safe(safe.bottom, 16)]}
        alwaysBounceVertical={false}>
        <Text>{i18n.t('Theme')}</Text>
      </ScrollView>
    </View>
  );
};

export default MapSettingsView;
