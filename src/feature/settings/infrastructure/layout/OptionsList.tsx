import {atoms as a} from '@core/layout';
import Icon from '@shared/ui/component/Icon';
import Spacer from '@shared/ui/component/Spacer';
import type {FC} from 'react';
import type { FlatListProps} from 'react-native';
import {FlatList, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

type OptionItemProps = {
  id: string;
  onPress: (id: string) => void;
  selected: boolean;
  title: string;
};

const OptionItem: FC<OptionItemProps> = ({id, title, selected, onPress}) => {
  const handlePress = () => onPress(id);

  return (
    <RectButton
      onPress={handlePress}
      style={[a.py_sm, a.px_lg, a.flex_row, a.justify_between, a.align_center]}>
      <Text style={[a.font_body_one_medium]}>{title}</Text>
      {selected && <Icon name="check" size={18} />}
    </RectButton>
  );
};

type Props = {
  onPress: (id: string) => void;
  selected: string;
} & Omit<FlatListProps<{id: string; title: string}>, 'renderItem'>;

const OptionsList: FC<Props> = ({data, onPress, ...rest}) => {
  const renderItem = ({item}: {item: {id: string; title: string}}) => (
    <OptionItem
      id={item.id}
      onPress={onPress}
      selected={item.id === rest.selected}
      title={item.title}
    />
  );

  return (
    <FlatList
      alwaysBounceVertical={false}
      data={data}
      renderItem={renderItem}
      style={[a.flex_1]}
      ItemSeparatorComponent={Spacer}
      {...rest}
    />
  );
};

export default OptionsList;
