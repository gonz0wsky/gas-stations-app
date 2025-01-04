import {useWindow} from '@core/layout';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import Header from '@shared/ui/component/Header';
import {FC} from 'react';
import {Text} from 'react-native';

type Props = {
  handlePressSettings: () => void;
  w: ReturnType<typeof useWindow>;
};

const StationsBottomSheetView: FC<Props> = ({handlePressSettings, w}) => {
  return (
    <BottomSheetView style={[{width: w.width}]}>
      <Header
        isModal
        transparent
        rightIcon="settings"
        onPressRight={handlePressSettings}
        style={[{paddingTop: 0, paddingBottom: 0}]}
      />
      <Text>Stations</Text>
    </BottomSheetView>
  );
};

export default StationsBottomSheetView;
