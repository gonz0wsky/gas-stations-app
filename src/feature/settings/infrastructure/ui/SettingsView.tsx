import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import type SettingsViewModel from './useSettingsViewModel';
import {atoms as a, useSafeArea, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';
import {RectButton} from 'react-native-gesture-handler';
import Icon from '@shared/ui/component/Icon';
import PRODUCT_NAMES from '@shared/constants/names/product-names';
import Spacer from '@shared/ui/component/Spacer';
import MAP_NAMES from '@shared/constants/names/map-names';
import RADIUS_NAMES from '@shared/constants/names/radius-names';
import THEME_NAMES from '@shared/constants/names/theme-names';

type SectionTitleProps = {
  title: string;
};

const SectionTitle: FC<SectionTitleProps> = ({title}) => (
  <View style={[a.px_lg, a.py_sm]}>
    <Text numberOfLines={1} style={[a.font_body_one_medium]}>
      {title}
    </Text>
  </View>
);

type NavigateOptionProps = {
  title: string;
  subtitle?: string;
  onPress: () => void;
};

const NavigateOption: FC<NavigateOptionProps> = ({
  title,
  subtitle,
  onPress,
}) => {
  const t = useTheme();

  const pressStyle = {height: 56};

  return (
    <RectButton
      onPress={onPress}
      style={[
        pressStyle,
        t.atoms.option_navigate.bg,
        a.px_lg,
        a.flex_row,
        a.justify_between,
        a.align_center,
      ]}>
      <View>
        <Text numberOfLines={1} style={[a.font_body_one_medium]}>
          {title}
        </Text>
        {!!subtitle && (
          <Text numberOfLines={1} style={[a.font_body_two]}>
            {subtitle}
          </Text>
        )}
      </View>
      <Icon name="right-chevron" />
    </RectButton>
  );
};

const SettingsView: FC<ReturnType<typeof SettingsViewModel>> = ({
  carFuel,
  carLitresPer100Km,
  carTankLitres,
  handlePressConsuption,
  handlePressFuel,
  handlePressMapSettings,
  handlePressPrivacy,
  handlePressStationRadius,
  handlePressTankSize,
  handlePressTheme,
  kmToDisplay,
  mapStyle,
  onPressBack,
  selectedTheme,
}) => {
  const {i18n} = useLingui();
  const t = useTheme();
  const safe = useSafeArea();

  return (
    <View style={[a.flex_1]}>
      <Header
        title={i18n.t('Settings')}
        leftIcon="left-arrow"
        onPressLeft={onPressBack}
      />
      <ScrollView
        style={[t.atoms.bg.primary]}
        contentContainerStyle={[a.pt_sm, a.pb_safe(safe.bottom, 16)]}
        alwaysBounceVertical={false}>
        <SectionTitle title={i18n.t('General')} />
        <NavigateOption
          title={i18n.t('Map style')}
          subtitle={i18n.t(MAP_NAMES[mapStyle])}
          onPress={handlePressMapSettings}
        />
        <Spacer />
        <NavigateOption
          title={i18n.t('Station radius')}
          subtitle={i18n.t(RADIUS_NAMES[kmToDisplay])}
          onPress={handlePressStationRadius}
        />
        <SectionTitle title={i18n.t("Vehicle's information")} />
        <NavigateOption
          title={i18n.t('Fuel type')}
          subtitle={i18n.t(PRODUCT_NAMES[carFuel])}
          onPress={handlePressFuel}
        />
        <Spacer />
        <NavigateOption
          title={i18n.t('Tank size')}
          subtitle={`${carTankLitres} ${i18n.t('litres')}`}
          onPress={handlePressTankSize}
        />
        <Spacer />
        <NavigateOption
          title={i18n.t('Consumption')}
          subtitle={`${carLitresPer100Km}${i18n.t('l/100kms')}`}
          onPress={handlePressConsuption}
        />
        <SectionTitle title={i18n.t('Personalization')} />
        <NavigateOption
          title={i18n.t('Theme')}
          subtitle={i18n.t(THEME_NAMES[selectedTheme])}
          onPress={handlePressTheme}
        />
        <SectionTitle title={i18n.t('About')} />
        <NavigateOption
          title={i18n.t('Privacy policy')}
          onPress={handlePressPrivacy}
        />
      </ScrollView>
    </View>
  );
};

export default SettingsView;
