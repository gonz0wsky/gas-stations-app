type ServiceStationsDTO = {
  Fecha: string;
  ListaEESSPrecio: ServiceStationsItemDTO[];
  Nota: string;
  ResultadoConsulta: string;
};

type ServiceStationsItemDTO = {
  '% BioEtanol': string;
  '% Éster metílico': string;
  'C.P.': string;
  Dirección: string;
  Horario: string;
  IDCCAA: string;
  IDEESS: string;
  IDMunicipio: string;
  IDProvincia: string;
  Latitud: string;
  Localidad: string;
  'Longitud (WGS84)': string;
  Margen: 'D' | 'I' | 'N';
  Municipio: string;
  'Precio Biodiesel': string;
  'Precio Bioetanol': string;
  'Precio Gas Natural Comprimido': string;
  'Precio Gas Natural Licuado': string;
  'Precio Gases licuados del petróleo': string;
  'Precio Gasoleo A': string;
  'Precio Gasoleo B': string;
  'Precio Gasoleo Premium': string;
  'Precio Gasolina 95 E10': string;
  'Precio Gasolina 95 E5 Premium': string;
  'Precio Gasolina 95 E5': string;
  'Precio Gasolina 98 E10': string;
  'Precio Gasolina 98 E5': string;
  'Precio Hidrogeno': string;
  Provincia: string;
  Remisión: string;
  Rótulo: string;
  'Tipo Venta': string;
};

export type {ServiceStationsDTO, ServiceStationsItemDTO};
