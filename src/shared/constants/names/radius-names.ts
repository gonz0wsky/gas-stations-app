import {msg} from '@lingui/core/macro';

const RADIUS_NAMES: Record<string, ReturnType<typeof msg>> = {
  5: msg`5 kms`,
  10: msg`10 kms`,
  15: msg`15 kms`,
  25: msg`25 kms`,
  50: msg`50 kms`,
} as const;

export default RADIUS_NAMES;
