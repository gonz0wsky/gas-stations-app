import {SystemTheme} from '@core/layout/utils/useColorModeTheme';
import {Language} from '@core/locale/locales/types';
import {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';

export interface SystemSlice {
  language: Language;
  onboardingCompleted: boolean;
  setLanguage: (language: Language) => void;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
  setTheme: (theme: SystemTheme) => void;
  theme: SystemTheme;
}

const initialState: Pick<
  SystemSlice,
  'language' | 'theme' | 'onboardingCompleted'
> = {
  language: 'en',
  theme: 'system',
  onboardingCompleted: false,
};

const createSystemSlice: StateCreator<SystemSlice> = set => {
  sliceResetFns.add(() => set(() => initialState));

  return {
    ...initialState,
    setOnboardingCompleted: (onboardingCompleted: boolean) =>
      set(() => ({onboardingCompleted})),
    setLanguage: (language: Language) => set(() => ({language})),
    setTheme: (theme: SystemTheme) => set(() => ({theme})),
  };
};

export default createSystemSlice;
