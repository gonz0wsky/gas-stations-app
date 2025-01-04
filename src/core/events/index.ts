import {useEffect} from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

type Events = {
  'navigate-to-settings': null;
};

const eventEmitter = new EventEmitter();

const emitEvent = (name: keyof Events, params?: Events[keyof Events]) => {
  return eventEmitter.emit(name, params);
};

const listentEvent = <T>(
  name: keyof Events,
  callback: (...args: any[]) => T,
) => {
  return eventEmitter.addListener(name, callback);
};

const useListenEvent = <T>(
  name: keyof Events,
  callback: (...args: any[]) => T,
) => {
  useEffect(() => {
    const event = eventEmitter.addListener(name, callback);
    return () => event.remove();
  });
};

export {emitEvent, listentEvent, useListenEvent};
export default eventEmitter;
