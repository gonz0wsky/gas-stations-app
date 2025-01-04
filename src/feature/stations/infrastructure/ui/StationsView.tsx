import React, {FC} from 'react';
import {View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import type StationsViewModel from './useStationsViewModel';
import {atoms as a} from '@core/layout';
import MapView from './components/MapView';
import StationsBottomSheetView from './components/StationsBottomSheetView';
import StationDetailBottomSheetView from './components/StationDetailBottomSheetView';

const StationsView: FC<ReturnType<typeof StationsViewModel>> = ({
  bottomSheetRef,
  handlePressSettings,
  serviceStationsList,
  t,
  w,
}) => (
  <View style={[a.flex_1]}>
    <MapView style={[a.absolute, a.inset_0]} />
    <BottomSheet
      animateOnMount={false}
      enableDynamicSizing={false}
      index={2}
      ref={bottomSheetRef}
      snapPoints={['20%', '60%', '80%']}>
      <BottomSheetScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}>
        <StationsBottomSheetView
          handlePressSettings={handlePressSettings}
          stations={serviceStationsList ?? []}
          w={w}
          t={t}
        />
        <StationDetailBottomSheetView w={w} />
      </BottomSheetScrollView>
    </BottomSheet>
  </View>
);

export default StationsView;
