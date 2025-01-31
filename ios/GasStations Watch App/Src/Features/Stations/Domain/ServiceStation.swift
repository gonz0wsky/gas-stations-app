struct Position: Codable {
  let latitude: Double
  let longitude: Double
}

struct ServiceStation: Identifiable, Codable {
  let address: String
  let id: String
  let locality: String
  let municipality: String
  let name: String
  let position: Position
  let postalCode: String
  let products: Products
  let province: String
  let saleType: String
  let schedule: String
  let sideRoad: String?
}

struct Products: Codable {
  let biodiesel: Double
  let bioethanol: Double
  let compressedNaturalGas: Double
  let dieselA: Double
  let dieselB: Double
  let dieselPremium: Double
  let gasoline95E10: Double
  let gasoline95E5Premium: Double
  let gasoline95E5: Double
  let gasoline98E10: Double
  let gasoline98E5: Double
  let hydrogen: Double
  let liquefiedNaturalGas: Double
  let liquefiedPetroleumGas: Double
}

extension ServiceStation {
  static func mapDtoToServiceStation(dto: ServiceStationsItemDTO) -> ServiceStation {
    let sideRoadOptions: [String: String?] = [
      "D": "right",
      "I": "left",
      "N": nil
    ]
    
    return ServiceStation(
      address: dto.direccion,
      id: dto.idEESS,
      locality: dto.localidad,
      municipality: dto.municipio,
      name: dto.rotulo,
      position: Position(
        latitude: parseStringToDouble(dto.latitud),
        longitude: parseStringToDouble(dto.longitudWGS84)
      ),
      postalCode: dto.cp,
      products: Products(
        biodiesel: parseStringToDouble(dto.precioBiodiesel),
        bioethanol: parseStringToDouble(dto.precioBioetanol),
        compressedNaturalGas: parseStringToDouble(dto.precioGasNaturalComprimido),
        dieselA: parseStringToDouble(dto.precioGasoleoA),
        dieselB: parseStringToDouble(dto.precioGasoleoB),
        dieselPremium: parseStringToDouble(dto.precioGasoleoPremium),
        gasoline95E10: parseStringToDouble(dto.precioGasolina95E10),
        gasoline95E5Premium: parseStringToDouble(dto.precioGasolina95E5Premium),
        gasoline95E5: parseStringToDouble(dto.precioGasolina95E5),
        gasoline98E10: parseStringToDouble(dto.precioGasolina98E10),
        gasoline98E5: parseStringToDouble(dto.precioGasolina98E5),
        hydrogen: parseStringToDouble(dto.precioHidrogeno),
        liquefiedNaturalGas: parseStringToDouble(dto.precioGasNaturalLicuado),
        liquefiedPetroleumGas: parseStringToDouble(dto.precioGasesLicuadosLP)
      ),
      province: dto.provincia,
      saleType: dto.tipoVenta == "P" ? "public" : "private",
      schedule: dto.horario,
      sideRoad: sideRoadOptions[dto.margen] ?? nil
    )
  }
}

// Helper function to parse strings to double
func parseStringToDouble(_ value: String) -> Double {
  return Double(value) ?? 0.0
}
