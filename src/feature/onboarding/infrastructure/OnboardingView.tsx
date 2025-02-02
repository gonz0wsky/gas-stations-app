import {ScreenComponent} from '@core/navigation/routes/params';
import {useOnboardingViewModel} from './useOnboardingViewModel';
import {Image, ScrollView, Text, View} from 'react-native';
import {atoms as a, useSafeArea, useTheme, useWindow} from '@core/layout';
import {FC} from 'react';
import Button from '@shared/ui/component/Button';
import {ServiceStationProducts} from '@feature/stations/domain/ServiceStationModel';
import PRODUCT_NAMES from '@shared/constants/names/product-names';
import {useLingui} from '@lingui/react';
import {CONTENT} from './constants';

type PageProps = {
  onPressNext: () => void;
  onPressProductChange: () => void;
  position: number;
  userFuel: keyof ServiceStationProducts;
};

const Page: FC<PageProps> = ({
  onPressNext,
  onPressProductChange,
  position,
  userFuel,
}) => {
  const w = useWindow();
  const safe = useSafeArea();
  const {i18n} = useLingui();

  const titleStyles = {...a.font_title_one, fontSize: 32};

  return (
    <View
      style={[
        a.flex_1,
        a.align_center,
        a.mx_lg,
        a.pb_safe(safe.bottom, 20),
        a.pt_safe(safe.top, 20),
        {width: w.width - a.px_lg.paddingLeft - a.px_lg.paddingRight},
      ]}>
      <View style={[a.mt_2xl, a.rounded_md, a.overflow_hidden]}>
        <Image
          source={CONTENT[position]?.image}
          resizeMode="contain"
          style={[{width: w.width * 0.9, height: w.width * 0.9}]}
        />
      </View>
      <View style={[a.align_center]}>
        <Text style={[titleStyles, a.mt_lg]}>{CONTENT[position]?.title}</Text>
        <Text style={[a.font_body_one, a.text_center, a.mt_xl, a.mx_xl]}>
          {CONTENT[position]?.description}
        </Text>
        {position === 2 && (
          <Button
            style={[a.mt_2xl]}
            variant="secondary"
            title={i18n._(PRODUCT_NAMES[userFuel])}
            onPress={onPressProductChange}
          />
        )}
      </View>
      <Button
        style={[a.mt_auto, a.w_full]}
        title={CONTENT[position]?.button}
        onPress={onPressNext}
      />
    </View>
  );
};

export const OnboardingView: ScreenComponent<'Onboarding'> = () => {
  const {userFuel, handlePressProductChange, scrollViewRef, handlePressNext} =
    useOnboardingViewModel();
  const t = useTheme();

  return (
    <View style={[a.flex_1]}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={[a.flex_1, t.atoms.bg.primary]}>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Page
              key={i}
              onPressNext={handlePressNext}
              onPressProductChange={handlePressProductChange}
              position={i}
              userFuel={userFuel}
            />
          ))}
      </ScrollView>
    </View>
  );
};
