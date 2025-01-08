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
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </Svg>
);

export default Icon;
