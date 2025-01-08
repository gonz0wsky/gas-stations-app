import type {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import type {IconProps} from '../types';

const Icon: FC<IconProps> = ({size = 24, color = 'black', ...props}) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 12H5M12 19l-7-7 7-7"
    />
  </Svg>
);

export default Icon;
