import React, {FC} from 'react';
import {View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import type StationsViewModel from './useStationsViewModel';
import {atoms as a} from '@core/layout';
import MapView from './components/MapView';
import StationsBottomSheetView from './components/StationsBottomSheetView';
import StationDetailBottomSheetView from './components/StationDetailBottomSheetView';
import Filter from './components/Filter';
import FILTER_OPTIONS from './constants/filter-constants';
import CircularButton from '@shared/ui/component/CircularButton';

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
      enableContentPanningGesture={false}
      snapPoints={['40%', '60%', '80%']}>
      <View style={[a.flex_row, a.mx_lg, a.align_center]}>
        <Filter
          style={[a.flex_1]}
          options={FILTER_OPTIONS}
          onPress={handlePressFilter}
          selected={filter}
        />
        <CircularButton
          style={[a.ml_sm]}
          icon="settings"
          onPress={handlePressSettings}
        />
      </View>
      <BottomSheetScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}>
        <StationsBottomSheetView
          onPressCard={handlePressCard}
          stations={filteredStations}
        />
        <StationDetailBottomSheetView />
      </BottomSheetScrollView>
    </BottomSheet>
  </View>
);

export default StationsView;
