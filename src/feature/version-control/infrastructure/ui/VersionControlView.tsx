import {SafeAreaView, Text, View} from 'react-native';
import type {FC} from 'react';
import {atoms as a, useTheme} from '@core/layout';
import Button from '@shared/ui/component/Button';
import {VIEW_TEXT} from './constants';
import {useLingui} from '@lingui/react';

type VersionControlViewProps = {
  variant: 'deprecated' | 'update_available';
  onPressNow: () => void;
  onPressLater?: () => void;
};

export const VersionControlView: FC<VersionControlViewProps> = ({
  variant,
  onPressNow,
  onPressLater,
}) => {
  const t = useTheme();
  const {i18n} = useLingui();

  return (
    <SafeAreaView
      style={[
        a.flex_1,
        t.atoms.bg.primary,
        a.justify_center,
        a.align_center,
        a.px_lg,
      ]}>
      <View style={[a.justify_center, a.align_center, a.gap_5xl]}>
        <Text style={[a.font_title_one]}>
          {i18n.t(VIEW_TEXT[variant].title)}
        </Text>
        <Text style={[a.font_body_one, a.text_center, a.mx_lg]}>
          {i18n.t(VIEW_TEXT[variant].description)}
        </Text>
        {variant === 'deprecated' && (
          <Button title={i18n.t('Actualizar ahora')} onPress={onPressNow} />
        )}
        {variant === 'update_available' && (
          <View style={[a.align_center, a.gap_lg]}>
            <Text style={[a.font_body_two]}>
              {i18n.t('¿Quieres actualizar ahora?')}
            </Text>
            <View style={[a.flex_row, a.justify_center, a.gap_lg]}>
              <Button
                variant="secondary"
                title={i18n.t('Más adelante')}
                onPress={onPressLater}
              />
              <Button title={i18n.t('Actualizar ahora')} onPress={onPressNow} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
