import React, {FC} from 'react';
import {Text, View} from 'react-native';
import type DatabaseViewModel from './useDatabaseViewModel';
import Button from '@shared/ui/component/Button';

const DatabaseView: FC<ReturnType<typeof DatabaseViewModel>> = ({
  i18n,
  callGasApi,
}) => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Text>{i18n.t('Database')}</Text>
    <Button title="Call Gas API" onPress={callGasApi} />
  </View>
);

export default DatabaseView;
