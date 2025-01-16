import React, {FC} from 'react';
import {View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import type StationsViewModel from './useStationsViewModel';
import {atoms as a} from '@core/layout';
import MapView from './components/MapView';
import StationsBottomSheetView from './components/StationsBottomSheetView';
import StationDetailBottomSheetView from './components/StationDetailBottomSheetView';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const StationsView: FC<ReturnType<typeof StationsViewModel>> = ({
  bottomSheetRef,
  filter,
  filteredStations,
  handleHorizontalOnMomentunScrollEnd,
  handlePressBack,
  handlePressCard,
  handlePressFavorite,
  handlePressFilter,
  handlePressMarker,
  handlePressSettings,
  horizontalViewRef,
  mapRef,
  mapStations,
  selectedStation,
  userCurrentLocation,
  userFavoriteStations,
  userVehicleFuel,
}) => {
  const INDEX = 1;

  const bsSharedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${interpolate(
      bsSharedValue.value,
      [0, INDEX, 2],
      [48.3, 74.1, 100],
    )}%`,
  }));

  return (
    <View style={[a.flex_1]}>
      <MapView
        mapRef={mapRef}
        stations={mapStations}
        onPressMarker={handlePressMarker}
      />
      <BottomSheet
        animatedIndex={bsSharedValue}
        enableOverDrag={false}
        animateOnMount={false}
        enableDynamicSizing={false}
        index={INDEX}
        ref={bottomSheetRef}
        enableContentPanningGesture={false}
        snapPoints={['40%', '60%', '80%']}>
        <Animated.View style={[animatedStyle]}>
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
              userLocation={userCurrentLocation}
              userPreferredProduct={userVehicleFuel}
            />
            {!!selectedStation && (
              <StationDetailBottomSheetView
                handlePressBack={handlePressBack}
                handlePressFavorite={handlePressFavorite}
                station={selectedStation}
                userFavoriteStations={userFavoriteStations}
                userLocation={userCurrentLocation}
              />
            )}
          </BottomSheetScrollView>
        </Animated.View>
      </BottomSheet>
    </View>
  );
};

export default StationsView;
