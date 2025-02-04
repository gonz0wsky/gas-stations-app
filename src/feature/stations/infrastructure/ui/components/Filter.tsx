import type {ViewStyleProp} from '@core/layout';
import {atoms as a, useTheme} from '@core/layout';
import type {FC} from 'react';
import {useCallback} from 'react';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import type {FilterOption} from '../constants/filter-constants';

type FilterProps = {
  onPress: (id: FilterOption) => void;
  options: {id: FilterOption; label: string}[];
  selected: FilterOption;
} & ViewStyleProp;

const filterStyles = {height: 36};

const Filter: FC<FilterProps> = ({options, selected, onPress, style}) => {
  const t = useTheme();

  const render = useCallback(
    ({id, label}: {id: FilterOption; label: string}) => (
      <RectButton
        key={id}
        onPress={() => onPress(id)}
        style={[
          filterStyles,
          a.flex_1,
          a.align_center,
          a.justify_center,
          selected === id && t.atoms.components.filter.background_active,
        ]}>
        <Text
          numberOfLines={1}
          style={[
            a.px_md,
            a.font_body_one_medium,
            t.atoms.components.filter.text,
            selected === id && t.atoms.components.filter.text_active,
          ]}>
          {label}
        </Text>
      </RectButton>
    ),
    [
      onPress,
      selected,
      t.atoms.components.filter.background_active,
      t.atoms.components.filter.text,
      t.atoms.components.filter.text_active,
    ],
  );

  return (
    <View
      style={[
        style,
        t.atoms.components.filter.background,
        a.flex_row,
        a.rounded_sm,
        a.overflow_hidden,
      ]}>
      {options.map(render)}
    </View>
  );
};

export default Filter;
