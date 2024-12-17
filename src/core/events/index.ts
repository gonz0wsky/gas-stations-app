import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

type Events = {
  'update-stations-database': null;
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

export {emitEvent, listentEvent};
export default eventEmitter;
