import {ScreenComponent} from '@core/navigation/routes/params';
import {useOnboardingViewModel} from './useOnboardingViewModel';
import {ScrollView, Text, View} from 'react-native';
import {atoms as a, useSafeArea, useTheme, useWindow} from '@core/layout';
import {FC} from 'react';
import LottieView from 'lottie-react-native';
import {GpsLocationLottie} from '@assets/lottie';
import Button from '@shared/ui/component/Button';
import {ServiceStationProducts} from '@feature/stations/domain/ServiceStationModel';
import PRODUCT_NAMES from '@shared/constants/names/product-names';
import {useLingui} from '@lingui/react';

const CONTENT: Array<{title: string; description: string; button: string}> = [
  {
    title: 'Ahorra',
    description:
      'Consulta los precios actualizados de las gasolineras cercanas y ahorra en cada repostaje.',
    button: 'Siguiente',
  },
  {
    title: 'Encuentra',
    description:
      'Para mostrarte las gasolineras más cercanas y sus precios, necesitamos acceder a tu ubicación.',
    button: 'Acceder a mi ubicación',
  },
  {
    title: 'Adapta',
    description:
      'Selecciona el tipo de combustible que usas para mostrar primero las gasolineras con ese precio.',
    button: 'Empezar a ahorrar',
  },
] as const;

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
      <LottieView
        style={[{height: w.width * 0.9, width: w.width}, a.mt_2xl]}
        source={GpsLocationLottie}
        autoPlay
        loop
      />
      <View style={[a.align_center]}>
        <Text style={[{...a.font_title_one, fontSize: 32}, a.mt_lg]}>
          {CONTENT[position]?.title}
        </Text>
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
