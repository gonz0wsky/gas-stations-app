import {msg} from '@lingui/core/macro';

export const VIEW_TEXT: Record<
  'deprecated' | 'update_available',
  {
    title: ReturnType<typeof msg>;
    description: ReturnType<typeof msg>;
  }
> = {
  deprecated: {
    title: msg`Actualización disponible`,
    description: msg`Hay una nueva versión disponible. Por favor, actualice a la última versión.`,
  },
  update_available: {
    title: msg`Actualización disponible`,
    description: msg`Hay una nueva versión disponible. Por favor, actualice a la última versión.`,
  },
} as const;
