import React from 'react';
import {ScreenComponent} from '@core/navigation/routes/params';
import DatabaseView from './infrastructure/ui/DatabaseView';
import useDatabaseViewModel from './infrastructure/ui/useDatabaseViewModel';

const Database: ScreenComponent<'Database'> = () => (
  <DatabaseView {...useDatabaseViewModel()} />
);

export default Database;
