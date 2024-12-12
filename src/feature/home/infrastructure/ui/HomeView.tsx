import React, {FC} from 'react';
import {Text, View} from 'react-native';
import type HomeViewModel from './useHomeViewModel';

const HomeView: FC<ReturnType<typeof HomeViewModel>> = ({i18n}) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{i18n.t('Home')}</Text>
  </View>
);

export default HomeView;
