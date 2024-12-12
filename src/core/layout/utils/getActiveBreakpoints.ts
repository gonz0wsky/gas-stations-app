import {breakpoints} from '@core/layout/tokens';

export {atoms} from '@core/layout/atoms';
export * as tokens from '@core/layout/tokens';
export * from '@core/layout/types';
export * from '@core/layout/utils/flatten';
export * from '@core/layout/utils/platform';

function getActiveBreakpoints({width}: {width: number}) {
  const active: (keyof typeof breakpoints)[] = Object.keys(breakpoints).filter(
    breakpoint => width >= breakpoints[breakpoint],
  );

  return {
    active: active[active.length - 1],
    gtMobile: active.includes('gtMobile'),
    gtTablet: active.includes('gtTablet'),
  };
}

export default getActiveBreakpoints;
