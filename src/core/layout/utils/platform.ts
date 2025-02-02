import {Platform} from 'react-native';

export function web(value: unknown) {
  return Platform.select({
    web: value,
  });
}

export function ios(value: unknown) {
  return Platform.select({
    ios: value,
  });
}

export function android(value: unknown) {
  return Platform.select({
    android: value,
  });
}

export function native(value: unknown) {
  return Platform.select({
    native: value,
  });
}
