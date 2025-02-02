import type {ImageURISource} from 'react-native';

export const CONTENT: Array<{
  title: string;
  description: string;
  button: string;
  image: ImageURISource;
}> = [
  {
    title: 'Ahorra',
    description:
      'Consulta los precios actualizados de las gasolineras cercanas y ahorra en cada repostaje.',
    button: 'Siguiente',
    image: require('@assets/images/gas-station.png'),
  },
  {
    title: 'Encuentra',
    description:
      'Para mostrarte las gasolineras más cercanas y sus precios, necesitamos acceder a tu ubicación.',
    button: 'Acceder a mi ubicación',
    image: require('@assets/images/location.png'),
  },
  {
    title: 'Personaliza',
    description:
      'Selecciona el tipo de combustible que usas para mostrar primero las gasolineras con ese precio.',
    button: 'Empezar a ahorrar',
    image: require('@assets/images/products.png'),
  },
] as const;
