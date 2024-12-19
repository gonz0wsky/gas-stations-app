import {useWindow} from '@core/layout';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {FC} from 'react';
import {Text} from 'react-native';

const StationsBottomSheetView: FC<{w: ReturnType<typeof useWindow>}> = ({
  w,
}) => {
  return (
    <BottomSheetView style={[{width: w.width}]}>
      <Text>Stations</Text>
    </BottomSheetView>
  );
};

export default StationsBottomSheetView;
