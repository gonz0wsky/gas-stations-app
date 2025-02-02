import type { ViewStyleProp} from '@core/layout';
import {atoms as a, useTheme} from '@core/layout';
import type {FC} from 'react';
import { useCallback} from 'react';
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
          selected === id && t.atoms.selector.selected_bg,
        ]}>
        <Text
          numberOfLines={1}
          style={[
            a.px_md,
            a.font_body_one_medium,
            t.atoms.selector.text,
            selected === id && t.atoms.selector.selected_text,
          ]}>
          {label}
        </Text>
      </RectButton>
    ),
    [
      onPress,
      selected,
      t.atoms.selector.selected_bg,
      t.atoms.selector.selected_text,
      t.atoms.selector.text,
    ],
  );

  return (
    <View
      style={[
        style,
        a.flex_row,
        a.rounded_sm,
        t.atoms.selector.bg,
        a.overflow_hidden,
      ]}>
      {options.map(render)}
    </View>
  );
};

export default Filter;
