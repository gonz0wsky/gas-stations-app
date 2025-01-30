protocol ServiceStationRepository {
  func getFavorites() -> [ServiceStation]
  func getSortedByDistance() -> [ServiceStation]
  func getSortedByPrice() -> [ServiceStation]
}
