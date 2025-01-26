import {useEffect} from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

type Events = {};

export const eventEmitter = new EventEmitter();

export const emitEvent = (
  name: keyof Events,
  params?: Events[keyof Events],
) => {
  return eventEmitter.emit(name, params);
};

export const listentEvent = <T>(
  name: keyof Events,
  callback: (...args: any[]) => T,
) => {
  return eventEmitter.addListener(name, callback);
};

export const useListenEvent = <T>(
  name: keyof Events,
  callback: (...args: any[]) => T,
) => {
  useEffect(() => {
    const event = eventEmitter.addListener(name, callback);
    return () => event.remove();
  });
};
