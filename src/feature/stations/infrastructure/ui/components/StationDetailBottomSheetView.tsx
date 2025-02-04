import {atoms as a, useSafeArea, useTheme, useWindow} from '@core/layout';
import {msg} from '@lingui/core/macro';
import type {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import type {ServiceStationProducts} from '@feature/stations/domain/ServiceStationModel';
import {BottomSheetView, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useLingui} from '@lingui/react';
import Button from '@shared/ui/component/Button';
import Header from '@shared/ui/component/Header';
import Icon from '@shared/ui/component/Icon';
import type {IconName} from '@shared/ui/component/Icon/types';
import {calculateDistanceInKm} from '@shared/utils/calculateDistanceInKm';
import type {FC} from 'react';
import {Text, View} from 'react-native';
import PRODUCT_NAMES from '@shared/constants/names/product-names';
import Spacer from '@shared/ui/component/Spacer';

const SIDE_ROAD_NAMES: Record<'right' | 'left', ReturnType<typeof msg>> = {
  right: msg`Right`,
  left: msg`Left`,
};

type StationProductsDetailRowProps = {
  products: ServiceStationProducts;
};

const StationPricesDetailCard: FC<StationProductsDetailRowProps> = ({
  products,
}) => {
  const {i18n} = useLingui();
  const t = useTheme();

  const viewStyle = {alignSelf: 'flex-start'} as const;

  return (
    <View style={[a.flex_row, a.align_center]}>
      <View
        style={[
          a.mr_md,
          t.atoms.components.station_detail_row.icon_bg,
          a.p_sm,
          a.border,
          a.rounded_sm,
          viewStyle,
        ]}>
        <Icon
          name="bank-notes"
          color={t.atoms.components.station_detail_row.icon.color}
        />
      </View>
      <View style={[a.flex_1]}>
        <Text
          numberOfLines={1}
          style={[
            a.font_body_one_medium,
            a.mb_xs,
            t.atoms.components.station_detail_row.title,
          ]}>
          {i18n.t('Prices')}
        </Text>
        {Object.entries(products).map(([fuel, price]) => {
          if (!price) {
            return null;
          }

          return (
            <View key={fuel} style={[a.flex_row, a.justify_between]}>
              <Text
                numberOfLines={1}
                style={[
                  a.font_body_two,
                  t.atoms.components.station_detail_row.subtitle,
                ]}>
                {i18n.t(PRODUCT_NAMES[fuel as keyof ServiceStationProducts])}{' '}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  a.font_body_two_medium,
                  t.atoms.components.station_detail_row.subtitle,
                ]}>
                {price ? `${price} ${i18n.t('€/l')}` : i18n.t('N/A')}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

type StationDetailRowProps = {
  title: string;
  subtitle: string;
  icon: IconName;
};

const StationDetailRow: FC<StationDetailRowProps> = ({
  title,
  subtitle,
  icon,
}) => {
  const t = useTheme();

  return (
    <View style={[a.flex_row, a.align_center]}>
      <View
        style={[
          a.mr_md,
          t.atoms.components.station_detail_row.icon_bg,
          a.p_sm,
          a.border,
          a.rounded_sm,
        ]}>
        <Icon
          name={icon}
          color={t.atoms.components.station_detail_row.icon.color}
        />
      </View>
      <View>
        <Text
          numberOfLines={1}
          style={[
            a.font_body_one_medium,
            a.mb_xs,
            t.atoms.components.station_detail_row.title,
          ]}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            a.font_body_two,
            t.atoms.components.station_detail_row.subtitle,
          ]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

type Props = {
  handlePressBack: () => void;
  handlePressFavorite: (id: string) => void;
  handlePressOpenInMaps: () => void;
  station: ServiceStation;
  userFavoriteStations: string[];
  userLocation: {latitude: number; longitude: number};
};

const headerStyles = {paddingTop: 0};

export const StationDetailBottomSheetView: FC<Props> = ({
  handlePressBack,
  handlePressFavorite,
  handlePressOpenInMaps,
  station,
  userFavoriteStations,
  userLocation,
}) => {
  const t = useTheme();
  const w = useWindow();
  const safe = useSafeArea();
  const {i18n} = useLingui();

  if (!station) {
    return null;
  }

  return (
    <BottomSheetView style={[{width: w.width}]}>
      <Header
        style={[headerStyles, a.pb_sm, a.px_lg]}
        isModal
        transparent
        leftIcon="left-arrow"
        rightIcon={
          userFavoriteStations.includes(station.id) ? 'star-fill' : 'star'
        }
        onPressLeft={handlePressBack}
        onPressRight={() => handlePressFavorite(station.id)}
      />
      <BottomSheetScrollView
        automaticallyAdjustContentInsets
        alwaysBounceVertical={false}
        contentContainerStyle={[
          a.px_lg,
          a.pt_lg,
          a.flex_grow,
          a.pb_safe(safe.bottom, 16),
        ]}>
        <Text style={[a.font_title_one, a.mb_xs, t.atoms.text.primary]}>
          {station.name}
        </Text>
        <Text style={[a.font_caption, a.mb_lg, t.atoms.text.primary]}>
          {[station.address, station.locality].join(', ')}
        </Text>
        <View style={[a.gap_sm]}>
          <StationPricesDetailCard products={station.products} />
          <Spacer />
          <StationDetailRow
            title={i18n.t('Open Hours')}
            subtitle={station.schedule}
            icon="clock"
          />
          <Spacer />
          <StationDetailRow
            title={i18n.t('Distance')}
            subtitle={`${calculateDistanceInKm(
              userLocation,
              station.position,
            )} ${i18n.t('Km from your location')}`}
            icon="map"
          />
          <Spacer />
          <StationDetailRow
            title={i18n.t('Side road')}
            subtitle={
              station.sideRoad
                ? i18n.t(SIDE_ROAD_NAMES[station.sideRoad])
                : `${i18n.t('N/A')}`
            }
            icon="left-right-arrows"
          />
        </View>
        <Button
          style={[a.mt_auto]}
          title={i18n.t('Open in Maps')}
          onPress={handlePressOpenInMaps}
        />
      </BottomSheetScrollView>
    </BottomSheetView>
  );
};
