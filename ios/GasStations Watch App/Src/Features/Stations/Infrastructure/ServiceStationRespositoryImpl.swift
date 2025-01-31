class ServiceStationRespositoryImpl: ServiceStationRepository {
  
  private let api: APIRequest
  
  init() {
    let url: String = Config.shared.get(key: \ConfigObject.SERVICE_STATIONS_API)
    api = APIRequest(url, cacheKey: "service-stations-api", cacheExpiration: 60 * 30)
  }
  
  func getAllStations() async -> [ServiceStation] {
    do {
      let data: ServiceStationsDTO? = try await api.get()
      let serviceStations: [ServiceStation] = data?.listaEESSPrecio.map { dto in
        ServiceStation.mapDtoToServiceStation(dto: dto)
      } ?? []
      return serviceStations
      
    } catch {
      return []
    }
  }
  
  func getFavorites(favorites: [String]) async -> [ServiceStation] {
    let data: [ServiceStation] = await self.getAllStations()
    return data
  }
  
  func getSortedByDistance() async -> [ServiceStation] {
    let data: [ServiceStation] = await self.getAllStations()
    return data
  }
  
  func getSortedByPrice() async -> [ServiceStation] {
    let data: [ServiceStation] = await self.getAllStations()
    return data
  }
  
}
