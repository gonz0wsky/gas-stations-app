import type {FC} from 'react';

import LeftArrow from './icons/LeftArrow';
import RightChevron from './icons/RightChevron';
import Close from './icons/Close';
import Plus from './icons/Plus';
import Settings from './icons/Settings';
import Clock from './icons/Clock';
import Map from './icons/Map';
import LeftRightArrows from './icons/LeftRightArrows';
import Star from './icons/Star';
import BankNotes from './icons/BanknNotes';
import StarFill from './icons/StarFill';

import {IconProps} from './types';

const createSvgIcons = <T extends {[name: string]: FC<IconProps>}>(
  cfg: T,
): Record<keyof T, FC<IconProps>> => cfg;

export const icons = createSvgIcons({
  'bank-notes': BankNotes,
  'left-arrow': LeftArrow,
  'right-chevron': RightChevron,
  'left-right-arrows': LeftRightArrows,
  'star-fill': StarFill,
  clock: Clock,
  close: Close,
  map: Map,
  plus: Plus,
  settings: Settings,
  star: Star,
});
