func mock() -> [ServiceStation] {
  return [
    ServiceStation(id: "1", title: "Station 1"),
    ServiceStation(id: "2", title: "Station 2"),
    ServiceStation(id: "3", title: "Station 3"),
    ServiceStation(id: "4", title: "Station 4"),
    ServiceStation(id: "5", title: "Station 5"),
    ServiceStation(id: "6", title: "Station 6"),
    ServiceStation(id: "7", title: "Station 7"),
    ServiceStation(id: "8", title: "Station 8"),
    ServiceStation(id: "9", title: "Station 9"),
    ServiceStation(id: "10", title: "Station 10")
  ]
}


class ServiceStationRespositoryImpl: ServiceStationRepository {
  func getFavorites() -> [ServiceStation] {
    return mock()
  }
  
  func getSortedByDistance() -> [ServiceStation] {
    return mock()
  }
  
  func getSortedByPrice() -> [ServiceStation] {
    return mock()
  }
  
}
