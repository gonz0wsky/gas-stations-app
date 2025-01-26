import {useStore} from '@core/store/index';
import {i18n} from '@lingui/core';
import {I18nProvider as DefaultI18nProvider} from '@lingui/react';
import React, {useEffect} from 'react';

import {messages as messagesEn} from './locales/en/messages';
import {messages as messagesEs} from './locales/es/messages';

import {Language} from './locales/types';

const messages: Record<Language, Record<string, string>> = {
  es: messagesEs,
  en: messagesEn,
} as const;

export function I18nProvider({children}: {children: React.ReactNode}) {
  const language = useStore(state => state.language);

  useEffect(() => {
    i18n.loadAndActivate({
      locale: language,
      messages: messages[language] ?? messages['en'],
    });
  }, [language]);

  return <DefaultI18nProvider i18n={i18n}>{children}</DefaultI18nProvider>;
}
