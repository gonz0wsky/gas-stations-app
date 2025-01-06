import {useState} from 'react';

type Location = {
  latitude: number;
  longitude: number;
  origin: 'gps' | 'map';
};

const useLocation = () => {
  const [currentLocation] = useState<Location>({
    latitude: 37.386052,
    longitude: -5.984458,
    origin: 'gps',
  });

  return {currentLocation};
};

export default useLocation;
