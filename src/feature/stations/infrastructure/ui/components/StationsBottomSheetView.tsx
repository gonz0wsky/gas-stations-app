import {atoms as a, useSafeArea, useTheme, useWindow} from '@core/layout';
import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import {FC, useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import calculateDistanceInKm from '@shared/utils/calculateDistanteInKm';
import Filter from './Filter';
import FILTER_OPTIONS, {FilterOption} from '../constants/filter-constants';
import CircularButton from '@shared/ui/component/CircularButton';
import ServiceStationProducts from '@feature/stations/domain/ServiceStationProductsModel';

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
          style={[{minWidth: 80}, a.mr_lg, a.align_center, a.justify_between]}>
          <Text style={[a.font_title_two, priceRangeStyle]}>
            {price ? `${price} €/l` : 'N/A'}
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

type Props = {
  filter: FilterOption;
  handlePressFilter: (id: FilterOption) => void;
  handlePressSettings: () => void;
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
  onPressCard,
  priceRanges,
  stations,
  userLocation,
  userPreferredProduct,
}) => {
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
          a.pb_lg,
          a.px_lg,
          a.pb_safe(safe.bottom, 16),
          {gap: 4},
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
