import AppleWatchConnect from './NativeAppleWatchConnect';
import {ServiceStation} from './types/ServiceStation';

export function isWatchReachable(): boolean {
  return AppleWatchConnect.isWatchReachable();
}

export function updateStations({
  near,
  cheap,
  favorites,
}: {
  near: Array<ServiceStation>;
  cheap: Array<ServiceStation>;
  favorites: Array<ServiceStation>;
}): void {
  return AppleWatchConnect.updateStations<ServiceStation>(
    cheap,
    favorites,
    near,
  );
}
