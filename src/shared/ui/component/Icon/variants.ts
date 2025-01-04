import type {FC} from 'react';

import ArrowLeft from './icons/ArrowLeft';
import Close from './icons/Close';
import Plus from './icons/Plus';
import Settings from './icons/Settings';
import {IconProps} from './types';

const createSvgIcons = <T extends {[name: string]: FC<IconProps>}>(
  cfg: T,
): Record<keyof T, FC<IconProps>> => cfg;

export const icons = createSvgIcons({
  'arrow-left': ArrowLeft,
  close: Close,
  plus: Plus,
  settings: Settings,
});
