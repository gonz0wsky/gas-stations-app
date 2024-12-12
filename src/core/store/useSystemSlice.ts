import {SystemTheme} from '@core/layout/utils/useColorModeTheme';
import {Language} from '@core/locale/locales/types';
import {StateCreator} from 'zustand';
import {sliceResetFns} from './clearStorage';

export interface SystemSlice {
  language: Language;
  setLanguage: (language: Language) => void;
  setTheme: (theme: SystemTheme) => void;
  theme: SystemTheme;
}

const initialState: Pick<SystemSlice, 'language' | 'theme'> = {
  language: 'en',
  theme: 'system',
};

const createSystemSlice: StateCreator<SystemSlice> = set => {
  sliceResetFns.add(() => set(() => initialState));

  return {
    ...initialState,
    setLanguage: (language: Language) => set(() => ({language})),
    setTheme: (theme: SystemTheme) => set(() => ({theme})),
  };
};

export default createSystemSlice;
