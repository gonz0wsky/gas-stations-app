import React, {useState, type ReactNode} from 'react';
import {getVersion} from 'react-native-device-info';
import {CONFIG} from '@core/config';
import {Linking, Platform} from 'react-native';
import {VersionControlView} from './VersionControlView';
import useVersionControlStatusQuery from '../api/useVersionStatusQuery';

const openStore = () => {
  const {APP_STORE_ANDROID_ID, APP_STORE_IOS_ID} = CONFIG;

  const url = Platform.select({
    ios: `https://apps.apple.com/app/${APP_STORE_IOS_ID}`,
    android: `https://play.google.com/store/apps/details?id=${APP_STORE_ANDROID_ID}`,
  });

  if (url !== undefined) {
    Linking.openURL(url).catch(err =>
      console.error('Error occurred opening app store', err),
    );
  }
};

export const VersionControlProvider = ({children}: {children: ReactNode}) => {
  const {data} = useVersionControlStatusQuery(getVersion());

  const [ignoreData, setIgnoreData] = useState(false);

  const handlePressNow = () => {
    switch (data?.status) {
      case 'update_available':
        setIgnoreData(true);
        break;

      case 'deprecated':
        openStore();
        break;

      default:
        break;
    }
  };

  const handlePressLater = () => {
    setIgnoreData(true);
  };

  const status = data?.status;
  if (
    !ignoreData &&
    (status === 'update_available' || status === 'deprecated')
  ) {
    return (
      <VersionControlView
        onPressLater={handlePressLater}
        onPressNow={handlePressNow}
        variant={status}
      />
    );
  }

  return children as React.JSX.Element;
};
