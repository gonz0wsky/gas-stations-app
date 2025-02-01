protocol ServiceStationRepository {
  func getFavorites(favorites: [String]) async -> [ServiceStation]
  func getSortedByDistance() async -> [ServiceStation]
  func getSortedByPrice() async -> [ServiceStation]
}
