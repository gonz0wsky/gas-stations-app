
struct ConfigObject {
  let SERVICE_STATIONS_API: String
}

class Config {
  static let shared = Config()
  private var config: ConfigObject
  
  private init() {
    config = ConfigObject(SERVICE_STATIONS_API: "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/")
  }
  
  func get<T>(key: KeyPath<ConfigObject, T>) -> T {
    return config[keyPath: key]
  }
}
