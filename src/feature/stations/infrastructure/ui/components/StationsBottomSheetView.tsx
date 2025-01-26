import {atoms as a, useSafeArea, useTheme, useWindow} from '@core/layout';
import {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import {FC, useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {calculateDistanceInKm} from '@shared/utils/calculateDistanceInKm';
import Filter from './Filter';
import FILTER_OPTIONS, {FilterOption} from '../constants/filter-constants';
import CircularButton from '@shared/ui/component/CircularButton';
import ServiceStationProducts from '@feature/stations/domain/ServiceStationProductsModel';
import Skeleton from 'react-native-reanimated-skeleton';

type StationCardProps = {
  onPress: (id: string) => void;
  priceRanges: {lowEnd: number; midEnd: number};
  station: ServiceStation;
  userLocation: {latitude: number; longitude: number};
  userPreferredProduct: keyof ServiceStationProducts;
};

const StationCard = ({
  onPress,
  priceRanges,
  station,
  userLocation,
  userPreferredProduct,
}: StationCardProps) => {
  const priceInfoViewStyles = {minWidth: 80} as const;

  const t = useTheme();

  const distance = useMemo(
    () => calculateDistanceInKm(userLocation, station.position),
    [station.position, userLocation],
  );

  const price = station.products[userPreferredProduct];

  const priceRangeStyle = useMemo(() => {
    if (!price) {
      return t.atoms.station_card.price;
    }

    if (price < priceRanges.lowEnd) {
      return t.atoms.station_card.price_low;
    }

    if (price < priceRanges.midEnd) {
      return t.atoms.station_card.price_medium;
    }

    return t.atoms.station_card.price_high;
  }, [
    price,
    priceRanges.lowEnd,
    priceRanges.midEnd,
    t.atoms.station_card.price_high,
    t.atoms.station_card.price_low,
    t.atoms.station_card.price_medium,
    t.atoms.station_card.price,
  ]);

  const handlePress = () => onPress(station.id);

  return (
    <View style={[a.rounded_sm, a.overflow_hidden, t.atoms.station_card.bg]}>
      <RectButton style={[a.flex_row, a.py_sm, a.px_lg]} onPress={handlePress}>
        <View
          style={[
            priceInfoViewStyles,
            a.mr_lg,
            a.align_center,
            a.justify_between,
          ]}>
          <Text style={[a.font_title_two, priceRangeStyle]}>
            {typeof price === 'number'
              ? `${`${price}00`.slice(0, 5)} €/l`
              : 'N/A'}
          </Text>
          <Text
            style={[
              a.font_caption,
              t.atoms.station_card.distance,
            ]}>{`${distance} Km`}</Text>
        </View>
        <View style={[a.flex_1]}>
          <Text
            numberOfLines={1}
            style={[
              a.font_body_one_medium,
              a.mb_xs,
              t.atoms.station_card.title,
            ]}>
            {station.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[a.font_caption, t.atoms.station_card.subtitle]}>
            {station.address}
          </Text>
        </View>
      </RectButton>
    </View>
  );
};

const LoadingView: FC = () => {
  const w = useWindow();
  const containerStyle = Object.freeze({flex: 1});

  return (
    <Skeleton
      containerStyle={containerStyle}
      isLoading
      layout={[
        {
          flexDirection: 'row',
          width: w.width - a.mx_lg.marginLeft - a.mx_lg.marginRight,
          ...a.mb_sm,
          ...a.mx_lg,
          children: [
            {
              key: 'filter',
              height: 36,
              flex: 1,
              ...a.mr_sm,
              ...a.rounded_sm,
            },
            {
              key: 'circular-button',
              height: 36,
              width: 36,
              ...a.rounded_full,
            },
          ],
        },
        {
          gap: 4,
          children: Array.from({length: 8}, (_, i) => ({
            key: `station-card-${i}`,
            height: 55.2,
            width: '92%',
            ...a.mx_lg,
            ...a.rounded_sm,
          })),
        },
      ]}
    />
  );
};

type Props = {
  filter: FilterOption;
  handlePressFilter: (id: FilterOption) => void;
  handlePressSettings: () => void;
  isLoading: boolean;
  onPressCard: (id: string) => void;
  priceRanges: {lowEnd: number; midEnd: number};
  stations: ServiceStation[];
  userLocation: {latitude: number; longitude: number};
  userPreferredProduct: keyof ServiceStationProducts;
};

const StationsBottomSheetView: FC<Props> = ({
  filter,
  handlePressFilter,
  handlePressSettings,
  isLoading,
  onPressCard,
  priceRanges,
  stations,
  userLocation,
  userPreferredProduct,
}) => {
  const contentContainerStyle = {gap: 4} as const;

  const w = useWindow();
  const safe = useSafeArea();

  const handleRender = useCallback(
    ({item}: {item: ServiceStation}) => (
      <StationCard
        priceRanges={priceRanges}
        userLocation={userLocation}
        userPreferredProduct={userPreferredProduct}
        station={item}
        onPress={onPressCard}
      />
    ),
    [onPressCard, priceRanges, userLocation, userPreferredProduct],
  );

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <BottomSheetView style={[{width: w.width}]}>
      <View style={[a.flex_row, a.mx_lg, a.align_center]}>
        <Filter
          onPress={handlePressFilter}
          options={FILTER_OPTIONS}
          selected={filter}
          style={[a.flex_1]}
        />
        <CircularButton
          icon="settings"
          onPress={handlePressSettings}
          style={[a.ml_sm]}
        />
      </View>
      <BottomSheetFlatList
        contentContainerStyle={[
          a.px_lg,
          a.pb_safe(safe.bottom, 16),
          contentContainerStyle,
        ]}
        data={stations}
        initialNumToRender={12}
        maxToRenderPerBatch={4}
        renderItem={handleRender}
        style={[a.mt_sm]}
      />
    </BottomSheetView>
  );
};

export default StationsBottomSheetView;
