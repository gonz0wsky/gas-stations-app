import {useWindow} from '@core/layout';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {FC} from 'react';
import {Text} from 'react-native';

const StationDetailBottomSheetView: FC<{w: ReturnType<typeof useWindow>}> = ({
  w,
}) => {
  return (
    <BottomSheetView style={[{width: w.width}]}>
      <Text>Station Detail</Text>
    </BottomSheetView>
  );
};

export default StationDetailBottomSheetView;
