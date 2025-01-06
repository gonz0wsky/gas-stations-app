import {atoms as a, useTheme, useWindow} from '@core/layout';
import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import Header from '@shared/ui/component/Header';
import {FC} from 'react';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {FilterOptions} from '../useStationsViewModel';
import useStore from '@core/store';
import calculateDistanceInKm from '@shared/utils/calculateDistanteInKm';

const FILTER_OPTIONS: {id: FilterOptions; label: string}[] = [
  {id: 'price', label: 'Precio'},
  {id: 'near', label: 'Cercanos'},
  {id: 'favorites', label: 'Favoritos'},
];

type FilterProps = {
  onPress: (id: FilterOptions) => void;
  options: {id: FilterOptions; label: string}[];
  selected: FilterOptions;
};

const Filter: FC<FilterProps> = ({options, selected, onPress}) => {
  const t = useTheme();

  return (
    <View
      style={[
        a.mx_lg,
        a.flex_row,
        a.rounded_sm,
        t.atoms.selector.bg,
        a.overflow_hidden,
      ]}>
      {options.map(({id, label}) => (
        <RectButton
          key={id}
          onPress={() => onPress(id)}
          style={[
            a.flex_1,
            a.align_center,
            a.justify_center,
            a.py_md,
            selected === id && t.atoms.selector.selected_bg,
          ]}>
          <Text
            numberOfLines={1}
            style={[
              a.px_md,
              a.font_body_one_medium,
              t.atoms.selector.text,
              selected === id && t.atoms.selector.selected_text,
            ]}>
            {label}
          </Text>
        </RectButton>
      ))}
    </View>
  );
};

type StationCardProps = {
  station: ServiceStation;
  onPress: (id: string) => void;
};

const StationCard = ({station, onPress}: StationCardProps) => {
  const t = useTheme();
  const vehicleFuel = useStore(state => state.fuel);
  const currentLocation = useStore(state => state.currentLocation);

  // TODO: Replace with real data
  const distance = calculateDistanceInKm(currentLocation, station.position);

  const price = station.prices[vehicleFuel];

  const handlePress = () => onPress(station.id);

  return (
    <View style={[a.rounded_sm, a.overflow_hidden, t.atoms.station_card.bg]}>
      <RectButton style={[a.flex_row, a.py_sm, a.px_lg]} onPress={handlePress}>
        <View
          style={[{minWidth: 80}, a.mr_lg, a.align_center, a.justify_between]}>
          <Text style={[a.font_title_two, t.atoms.station_card.price]}>
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
  filter: FilterOptions;
  handlePressSettings: () => void;
  onPressCard: (id: string) => void;
  onPressFilter: (id: FilterOptions) => void;
  stations: ServiceStation[];
};

const StationsBottomSheetView: FC<Props> = ({
  filter,
  handlePressSettings,
  onPressCard,
  onPressFilter,
  stations,
}) => {
  const w = useWindow();
  return (
    <BottomSheetView style={[{width: w.width}]}>
      <Header
        isModal
        transparent
        rightIcon="settings"
        onPressRight={handlePressSettings}
        style={[{paddingTop: 0, paddingBottom: 0}]}
      />
      <View style={[a.flex_1, a.mt_sm]}>
        <Filter
          onPress={onPressFilter}
          selected={filter}
          options={FILTER_OPTIONS}
        />
        <BottomSheetFlatList
          data={stations}
          renderItem={({item}) => (
            <StationCard station={item} onPress={onPressCard} />
          )}
          contentContainerStyle={[a.pb_lg, a.pt_sm, a.px_lg, {gap: 4}]}
          style={[a.mt_sm]}
        />
      </View>
    </BottomSheetView>
  );
};

export default StationsBottomSheetView;
