import {useLingui} from '@lingui/react';

const useHomeViewModel = () => {
  const {i18n} = useLingui();

  return {
    i18n,
  };
};

export default useHomeViewModel;
