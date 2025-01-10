import type {ServiceStationsItemDTO} from '../infrastructure/api/ServiceStationsDTO';
import type ServiceStationProducts from './ServiceStationProductsModel';
import parseStringToNumber from '@shared/utils/parseStringToNumber';

type ServiceStation = {
  address: string;
  id: string;
  locality: string;
  municipality: string;
  name: string;
  position: {latitude: number; longitude: number};
  postalCode: string;
  products: ServiceStationProducts;
  province: string;
  saleType: 'public' | 'private';
  schedule: string;
  sideRoad: 'left' | 'right' | undefined;
};

const mapDtoToServiceStation = (
  dto: ServiceStationsItemDTO,
): ServiceStation => {
  const sideRoadOptions = {
    D: 'right',
    I: 'left',
    N: undefined,
  } as const;

  return {
    address: dto.Dirección,
    id: dto.IDEESS,
    locality: dto.Localidad,
    municipality: dto.Municipio,
    name: dto.Rótulo,
    position: {
      latitude: parseStringToNumber(dto.Latitud),
      longitude: parseStringToNumber(dto['Longitud (WGS84)']),
    },
    postalCode: dto['C.P.'],
    products: {
      biodiesel: parseStringToNumber(dto['Precio Biodiesel']),
      bioethanol: parseStringToNumber(dto['Precio Bioetanol']),
      compressed_natural_gas: parseStringToNumber(
        dto['Precio Gas Natural Comprimido'],
      ),
      diesel_a: parseStringToNumber(dto['Precio Gasoleo A']),
      diesel_b: parseStringToNumber(dto['Precio Gasoleo B']),
      diesel_premium: parseStringToNumber(dto['Precio Gasoleo Premium']),
      gasoline_95_e10: parseStringToNumber(dto['Precio Gasolina 95 E10']),
      gasoline_95_e5_premium: parseStringToNumber(
        dto['Precio Gasolina 95 E5 Premium'],
      ),
      gasoline_95_e5: parseStringToNumber(dto['Precio Gasolina 95 E5']),
      gasoline_98_e10: parseStringToNumber(dto['Precio Gasolina 98 E10']),
      gasoline_98_e5: parseStringToNumber(dto['Precio Gasolina 98 E5']),
      hydrogen: parseStringToNumber(dto['Precio Hidrogeno']),
      liquefied_natural_gas: parseStringToNumber(
        dto['Precio Gas Natural Licuado'],
      ),
      liquefied_petroleum_gas: parseStringToNumber(
        dto['Precio Gases licuados del petróleo'],
      ),
    },
    province: dto.Provincia,
    saleType: dto['Tipo Venta'] === 'P' ? 'public' : 'private',
    schedule: dto.Horario,
    sideRoad: sideRoadOptions[dto.Margen],
  };
};

export {mapDtoToServiceStation};

export default ServiceStation;
