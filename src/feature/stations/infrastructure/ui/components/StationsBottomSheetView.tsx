import {atoms as a, useSafeArea, useTheme, useWindow} from '@core/layout';
import type {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import type {FC} from 'react';
import {useCallback, useMemo} from 'react';
import type {FlatListProps} from 'react-native';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {calculateDistanceInKm} from '@shared/utils/calculateDistanceInKm';
import Filter from './Filter';
import type {FilterOption} from '../constants/filter-constants';
import FILTER_OPTIONS from '../constants/filter-constants';
import CircularButton from '@shared/ui/component/CircularButton';
import type {ServiceStationProducts} from '@feature/stations/domain/ServiceStationModel';
import Skeleton from 'react-native-reanimated-skeleton';
import type {PriceRanges} from '@shared/domain/PriceRanges';
import type {Location} from '@shared/domain/Location';

type StationCardProps = {
  onPress: (id: string) => void;
  priceRanges: PriceRanges;
  station: ServiceStation;
  userLocation: Location | null;
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
    () =>
      userLocation
        ? calculateDistanceInKm(userLocation, station.position)
        : null,
    [station.position, userLocation],
  );

  const price = station.products[userPreferredProduct];

  const priceRangeStyle = useMemo(() => {
    if (!price) {
      return t.atoms.components.card.price.default;
    }

    if (price < priceRanges.lowEnd) {
      return t.atoms.components.card.price.low;
    }

    if (price < priceRanges.midEnd) {
      return t.atoms.components.card.price.medium;
    }

    return t.atoms.components.card.price.high;
  }, [
    price,
    priceRanges.lowEnd,
    priceRanges.midEnd,
    t.atoms.components.card.price.high,
    t.atoms.components.card.price.default,
    t.atoms.components.card.price.low,
    t.atoms.components.card.price.medium,
  ]);

  const handlePress = () => onPress(station.id);

  return (
    <View
      style={[
        a.rounded_sm,
        a.overflow_hidden,
        t.atoms.components.card.background,
      ]}>
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
          <Text style={[a.font_caption, t.atoms.components.card.distance]}>
            {distance ? `${distance} Km` : 'N/A'}
          </Text>
        </View>
        <View style={[a.flex_1]}>
          <Text
            numberOfLines={1}
            style={[
              a.font_body_one_medium,
              a.mb_xs,
              t.atoms.components.card.title,
            ]}>
            {station.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[a.font_caption, t.atoms.components.card.subtitle]}>
            {station.address}
          </Text>
        </View>
      </RectButton>
    </View>
  );
};

const LoadingView: FC = () => {
  const t = useTheme();
  const w = useWindow();
  const containerStyle = Object.freeze({flex: 1});

  // if we use flex 1 animation will not work
  const calculatedFilterWidth =
    w.width -
    a.mx_lg.marginLeft -
    a.mx_lg.marginRight -
    a.mr_sm.marginRight -
    36;

  return (
    <Skeleton
      containerStyle={containerStyle}
      highlightColor={t.atoms.components.skeleton.foreground}
      boneColor={t.atoms.components.skeleton.background}
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
              width: calculatedFilterWidth,
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
  onRefresh: FlatListProps<ServiceStation>['onRefresh'];
  priceRanges: PriceRanges;
  refreshing: FlatListProps<ServiceStation>['refreshing'];
  stations: ServiceStation[];
  userLocation: Location | null;
  userPreferredProduct: keyof ServiceStationProducts;
};

const StationsBottomSheetView: FC<Props> = ({
  filter,
  handlePressFilter,
  handlePressSettings,
  isLoading,
  onPressCard,
  onRefresh,
  priceRanges,
  refreshing,
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
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={handleRender}
        showsVerticalScrollIndicator={false}
        style={[a.mt_sm]}
      />
    </BottomSheetView>
  );
};

export default StationsBottomSheetView;
