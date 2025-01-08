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
      d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
    />
  </Svg>
);

export default Icon;
