import type LocationDTO from './LocationDTO';

const GetCurrentLocationService = {
  run: async (): Promise<LocationDTO | null> => {
    // TODO implement real data
    const position: LocationDTO = {
      latitude: 37.386052,
      longitude: -5.984458,
      origin: 'gps',
    };

    return position;
  },
};

export default GetCurrentLocationService;
