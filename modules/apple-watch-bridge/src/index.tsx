import AppleWatchBridge from './NativeAppleWatchBridge';

export function isReachable(): boolean {
  return AppleWatchBridge.isReachable();
}
