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
  handleHorizontalOnMomentunScrollEnd,
  handlePressBack,
  handlePressCard,
  handlePressFavorite,
  handlePressFilter,
  handlePressSettings,
  horizontalViewRef,
  selectedStation,
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
      <BottomSheetScrollView
        bounces={false}
        horizontal
        onMomentumScrollEnd={handleHorizontalOnMomentunScrollEnd}
        pagingEnabled
        ref={horizontalViewRef}
        scrollEnabled={!!selectedStation}
        showsHorizontalScrollIndicator={false}>
        <StationsBottomSheetView
          filter={filter}
          handlePressFilter={handlePressFilter}
          handlePressSettings={handlePressSettings}
          onPressCard={handlePressCard}
          stations={filteredStations}
        />
        {!!selectedStation && (
          <StationDetailBottomSheetView
            handlePressBack={handlePressBack}
            handlePressFavorite={handlePressFavorite}
            station={selectedStation}
          />
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  </View>
);

export default StationsView;
