import React, {FC} from 'react';
import {View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import type HomeViewModel from './useHomeViewModel';
import {atoms as a} from '@core/layout';
import Map from './ui/Map';
import StationsBottomSheetView from './ui/StationsBottomSheetView';
import StationDetailBottomSheetView from './ui/StationDetailBottomSheetView';

const HomeView: FC<ReturnType<typeof HomeViewModel>> = ({
  w,
  bottomSheetRef,
}) => (
  <View style={[a.flex_1]}>
    <Map style={[a.absolute, a.inset_0]} />
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
        <StationsBottomSheetView w={w} />
        <StationDetailBottomSheetView w={w} />
      </BottomSheetScrollView>
    </BottomSheet>
  </View>
);

export default HomeView;
