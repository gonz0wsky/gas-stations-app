import {atoms as a, useTheme, useWindow} from '@core/layout';
import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import {FC} from 'react';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import useStore from '@core/store';
import calculateDistanceInKm from '@shared/utils/calculateDistanteInKm';

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
  onPressCard: (id: string) => void;
  stations: ServiceStation[];
};

const StationsBottomSheetView: FC<Props> = ({onPressCard, stations}) => {
  const w = useWindow();

  return (
    <BottomSheetView style={[{width: w.width}]}>
      <BottomSheetFlatList
        initialNumToRender={12}
        maxToRenderPerBatch={4}
        data={stations}
        renderItem={({item}) => (
          <StationCard station={item} onPress={onPressCard} />
        )}
        contentContainerStyle={[a.pb_lg, a.px_lg, {gap: 4}]}
        style={[a.mt_sm]}
      />
    </BottomSheetView>
  );
};

export default StationsBottomSheetView;
