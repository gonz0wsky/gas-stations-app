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
import type {MapViewProps} from 'react-native-maps';
import type {MapStyle} from '@core/store/useMapSlice';
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
    handlePressOpenInMaps,
    handlePressSettings,
    horizontalViewRef,
    isServiceStationsLoading,
    isServiceStationsRefetching,
    mapPois,
    mapRef,
    mapStyle,
    priceRanges,
    refetchServiceStations,
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
        handleIndicatorStyle={[t.atoms.background.tertiary]}
        handleStyle={t.atoms.background.primary}
        animatedIndex={bsSharedValue}
        enableOverDrag={false}
        animateOnMount={false}
        enableDynamicSizing={false}
        index={INDEX}
        ref={bottomSheetRef}
        enableContentPanningGesture={false}
        snapPoints={['40%', '60%', '80%']}>
        <Animated.View style={[animatedStyle, t.atoms.background.primary]}>
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
              isLoading={isServiceStationsLoading}
              onPressCard={handlePressCard}
              onRefresh={refetchServiceStations}
              priceRanges={priceRanges}
              refreshing={isServiceStationsRefetching}
              stations={filteredStationList}
              userLocation={userCurrentLocation}
              userPreferredProduct={userVehicleFuel}
            />
            {!!selectedStation && (
              <StationDetailBottomSheetView
                handlePressBack={handlePressBack}
                handlePressFavorite={handlePressFavorite}
                handlePressOpenInMaps={handlePressOpenInMaps}
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
