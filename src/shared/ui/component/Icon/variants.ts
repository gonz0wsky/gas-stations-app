import type {FC} from 'react';

import BankNotes from './icons/BanknNotes';
import Check from './icons/Check';
import Clock from './icons/Clock';
import Close from './icons/Close';
import LeftArrow from './icons/LeftArrow';
import LeftRightArrows from './icons/LeftRightArrows';
import Map from './icons/Map';
import Plus from './icons/Plus';
import RightChevron from './icons/RightChevron';
import Settings from './icons/Settings';
import Star from './icons/Star';
import StarFill from './icons/StarFill';

import {IconProps} from './types';

const createSvgIcons = <T extends {[name: string]: FC<IconProps>}>(
  cfg: T,
): Record<keyof T, FC<IconProps>> => cfg;

export const icons = createSvgIcons({
  'bank-notes': BankNotes,
  'left-arrow': LeftArrow,
  'left-right-arrows': LeftRightArrows,
  'right-chevron': RightChevron,
  'star-fill': StarFill,
  check: Check,
  clock: Clock,
  close: Close,
  map: Map,
  plus: Plus,
  settings: Settings,
  star: Star,
});
