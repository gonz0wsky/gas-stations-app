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
  filter,
  filteredStations,
  handlePressCard,
  handlePressFilter,
  handlePressSettings,
}) => (
  <View style={[a.flex_1]}>
    <MapView />
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
          filter={filter}
          handlePressSettings={handlePressSettings}
          onPressCard={handlePressCard}
          onPressFilter={handlePressFilter}
          stations={filteredStations}
        />
        <StationDetailBottomSheetView />
      </BottomSheetScrollView>
    </BottomSheet>
  </View>
);

export default StationsView;
