import type {FC} from 'react';
import React, {useEffect, useRef} from 'react';
import {ScrollView, Text, View} from 'react-native';
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
import CircularButton from '@shared/ui/component/CircularButton';
import useSettingsViewModel from './useSettingsViewModel';
import type {ScreenComponent} from '@core/navigation/routes/params';

type SectionTitleProps = {
  title: string;
};

const SectionTitle: FC<SectionTitleProps> = ({title}) => {
  const t = useTheme();

  return (
    <View
      style={[a.px_lg, a.py_sm, t.atoms.components.section_title.background]}>
      <Text
        numberOfLines={1}
        style={[a.font_body_one_medium, t.atoms.components.section_title.text]}>
        {title}
      </Text>
    </View>
  );
};

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
        t.atoms.components.settings_option.background,
        a.px_lg,
        a.flex_row,
        a.justify_between,
        a.align_center,
      ]}>
      <View>
        <Text
          numberOfLines={1}
          style={[
            a.font_body_one_medium,
            t.atoms.components.settings_option.title,
          ]}>
          {title}
        </Text>
        {!!subtitle && (
          <Text
            numberOfLines={1}
            style={[
              a.font_body_two,
              t.atoms.components.settings_option.subtitle,
            ]}>
            {subtitle}
          </Text>
        )}
      </View>
      <Icon
        name="right-chevron"
        color={t.atoms.components.settings_option.icon.color}
      />
    </RectButton>
  );
};

type SelectorOptionProps = {
  maxValue: number;
  minValue: number;
  onChange: (value: number) => void;
  step: number;
  subtitle?: string;
  title: string;
  value: number;
};

const SelectorOption: FC<SelectorOptionProps> = ({
  maxValue,
  minValue,
  onChange,
  step,
  subtitle,
  title,
  value,
}) => {
  const t = useTheme();

  const pressStyle = {height: 56} as const;

  const currentValueRef = useRef(value);
  const longPressIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    currentValueRef.current = value;
  }, [value]);

  const onPressMinus = () => {
    const nextValue = value - step;

    onChange(nextValue < minValue ? minValue : nextValue);
  };

  const onPressPlus = () => {
    const nextValue = value + step;

    onChange(nextValue > maxValue ? maxValue : nextValue);
  };

  const onLongPressMinus = () => {
    longPressIntervalRef.current = setInterval(() => {
      const nextValue = currentValueRef.current - step;

      onChange(nextValue < minValue ? minValue : nextValue);
    }, 100);
  };

  const onLongPressPlus = () => {
    longPressIntervalRef.current = setInterval(() => {
      const nextValue = currentValueRef.current + step;

      onChange(nextValue > maxValue ? maxValue : nextValue);
    }, 100);
  };

  const onLongPressEnd = () => {
    clearInterval(longPressIntervalRef.current);
  };

  return (
    <View
      style={[
        pressStyle,
        t.atoms.components.settings_option.background,
        a.px_lg,
        a.flex_row,
        a.justify_between,
        a.align_center,
      ]}>
      <View>
        <Text
          numberOfLines={1}
          style={[
            a.font_body_one_medium,
            t.atoms.components.settings_option.title,
          ]}>
          {title}
        </Text>
        {!!subtitle && (
          <Text
            numberOfLines={1}
            style={[
              a.font_body_two,
              t.atoms.components.settings_option.subtitle,
            ]}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={[a.flex_row, a.align_center, a.gap_sm]}>
        <CircularButton
          icon="minus"
          onPress={onPressMinus}
          onLongPress={onLongPressMinus}
          onEnded={onLongPressEnd}
        />
        <CircularButton
          icon="plus"
          onPress={onPressPlus}
          onLongPress={onLongPressPlus}
          onEnded={onLongPressEnd}
        />
      </View>
    </View>
  );
};

export const SettingsView: ScreenComponent<'Settings'> = () => {
  const {
    carFuel,
    carLitresPer100Km,
    carTankLitres,
    handleOnChangeConsumption,
    handleOnChangeTankSize,
    handlePressFuel,
    handlePressMapSettings,
    handlePressPrivacy,
    handlePressStationRadius,
    handlePressTheme,
    kmToDisplay,
    mapStyle,
    onPressBack,
    selectedTheme,
  } = useSettingsViewModel();
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
        style={[t.atoms.background.primary]}
        contentContainerStyle={[a.pb_safe(safe.bottom, 16)]}
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
        <SelectorOption
          maxValue={2000}
          minValue={0.5}
          onChange={handleOnChangeTankSize}
          step={0.5}
          subtitle={`${carTankLitres} ${i18n.t('litres')}`}
          title={i18n.t('Tank size')}
          value={carTankLitres}
        />
        <Spacer />
        <SelectorOption
          maxValue={50}
          minValue={0.5}
          onChange={handleOnChangeConsumption}
          step={0.5}
          subtitle={`${carLitresPer100Km}${i18n.t('l/100kms')}`}
          title={i18n.t('Consumption')}
          value={carLitresPer100Km}
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
