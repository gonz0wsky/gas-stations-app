import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  isWatchReachable(): boolean;
  updateStations<T>(cheap: Array<T>, favorites: Array<T>, near: Array<T>): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('AppleWatchConnect');
