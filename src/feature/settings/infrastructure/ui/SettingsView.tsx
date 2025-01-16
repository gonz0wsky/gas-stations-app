import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import type SettingsViewModel from './useSettingsViewModel';
import {atoms as a, useSafeArea, useTheme} from '@core/layout';
import Header from '@shared/ui/component/Header';
import {useLingui} from '@lingui/react';
import {RectButton} from 'react-native-gesture-handler';
import Icon from '@shared/ui/component/Icon';
import PRODUCT_NAMES from '@shared/constants/names/product-names';

const Spacer: FC = () => {
  const t = useTheme();
  return <View style={[t.atoms.spacer, a.h_2xs]} />;
};

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
  handlePressMapSettings,
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
          subtitle={`${mapStyle}`}
          onPress={handlePressMapSettings}
        />
        <Spacer />
        <NavigateOption
          title={i18n.t('Station radius')}
          subtitle={`${kmToDisplay} ${i18n.t('km')}`}
          onPress={() => {}}
        />
        <SectionTitle title={i18n.t("Vehicle's information")} />
        <NavigateOption
          title={i18n.t('Combustible type')}
          subtitle={i18n.t(PRODUCT_NAMES[carFuel])}
          onPress={() => {}}
        />
        <Spacer />
        <NavigateOption
          title={i18n.t('Tank size')}
          subtitle={`${carTankLitres} ${i18n.t('litres')}`}
          onPress={() => {}}
        />
        <Spacer />
        <NavigateOption
          title={i18n.t('Consumption')}
          subtitle={`${carLitresPer100Km}${i18n.t('l/100kms')}`}
          onPress={() => {}}
        />
        <SectionTitle title={i18n.t('Personalization')} />
        <NavigateOption
          title={i18n.t('Theme')}
          subtitle={selectedTheme}
          onPress={() => {}}
        />
        <SectionTitle title={i18n.t('About')} />
        <NavigateOption title={i18n.t('Privacy policy')} onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

export default SettingsView;
