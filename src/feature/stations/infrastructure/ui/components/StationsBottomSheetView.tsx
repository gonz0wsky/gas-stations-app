import {atoms as a, useTheme, useWindow} from '@core/layout';
import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import Header from '@shared/ui/component/Header';
import {FC} from 'react';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

type StationCardProps = {
  station: ServiceStation;
  t: ReturnType<typeof useTheme>;
};

const StationCard = ({station, t}: StationCardProps) => {
  // TODO: Replace with real data
  const distance = 12.3;
  // TODO: Replace with real data
  const price = 12.122;

  return (
    <View style={[a.rounded_sm, a.overflow_hidden, t.atoms.station_card.bg]}>
      <RectButton style={[a.flex_row, a.py_sm, a.px_lg]}>
        <View style={[a.mr_lg, a.align_center, a.justify_between]}>
          <Text
            style={[
              a.font_title_two,
              t.atoms.station_card.price,
            ]}>{`${price} €/l`}</Text>
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
  handlePressSettings: () => void;
  stations: ServiceStation[];
  t: ReturnType<typeof useTheme>;
  w: ReturnType<typeof useWindow>;
};

const StationsBottomSheetView: FC<Props> = ({
  handlePressSettings,
  stations,
  t,
  w,
}) => {
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
        <BottomSheetFlatList
          data={stations}
          renderItem={({item}) => <StationCard station={item} t={t} />}
          contentContainerStyle={[a.pb_lg, a.pt_sm, a.px_lg, {gap: 4}]}
        />
      </View>
    </BottomSheetView>
  );
};

export default StationsBottomSheetView;
