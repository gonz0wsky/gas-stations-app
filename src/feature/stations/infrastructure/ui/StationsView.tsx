import React from 'react';
import {View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {atoms as a, useTheme} from '@core/layout';
import {MapView} from './components/MapView';
import StationsBottomSheetView from './components/StationsBottomSheetView';
import {StationDetailBottomSheetView} from './components/StationDetailBottomSheetView';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useStationsViewModel} from './useStationsViewModel';
import {MapViewProps} from 'react-native-maps';
import {MapStyle} from '@core/store/useMapSlice';
import type {ScreenComponent} from '@core/navigation/routes/params';

const INDEX = 1 as const;

const mapVariants: Record<
  MapStyle,
  MapViewProps['userInterfaceStyle'] | undefined
> = {
  dark: 'dark',
  light: 'light',
  system: undefined,
} as const;

export const StationsView: ScreenComponent<'Stations'> = () => {
  const {
    bottomSheetRef,
    filter,
    filteredStationList,
    handleHorizontalOnMomentunScrollEnd,
    handlePressBack,
    handlePressCard,
    handlePressFavorite,
    handlePressFilter,
    handlePressMarker,
    handlePressSettings,
    horizontalViewRef,
    isServiceStationsLoading,
    mapPois,
    mapRef,
    mapStyle,
    priceRanges,
    selectedStation,
    userCurrentLocation,
    userFavoriteStationsIds,
    userVehicleFuel,
  } = useStationsViewModel();

  const t = useTheme();

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
        bsSharedValue={bsSharedValue}
        mapRef={mapRef}
        mapStyle={mapVariants[mapStyle]}
        onPressMarker={handlePressMarker}
        poiList={mapPois}
      />
      <BottomSheet
        handleStyle={t.atoms.bg.primary}
        animatedIndex={bsSharedValue}
        enableOverDrag={false}
        animateOnMount={false}
        enableDynamicSizing={false}
        index={INDEX}
        ref={bottomSheetRef}
        enableContentPanningGesture={false}
        snapPoints={['40%', '60%', '80%']}>
        <Animated.View style={[animatedStyle, t.atoms.bg.primary]}>
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
              priceRanges={priceRanges}
              stations={filteredStationList}
              userLocation={userCurrentLocation}
              userPreferredProduct={userVehicleFuel}
              isLoading={isServiceStationsLoading}
            />
            {!!selectedStation && (
              <StationDetailBottomSheetView
                handlePressBack={handlePressBack}
                handlePressFavorite={handlePressFavorite}
                station={selectedStation}
                userFavoriteStations={userFavoriteStationsIds}
                userLocation={userCurrentLocation}
              />
            )}
          </BottomSheetScrollView>
        </Animated.View>
      </BottomSheet>
    </View>
  );
};
