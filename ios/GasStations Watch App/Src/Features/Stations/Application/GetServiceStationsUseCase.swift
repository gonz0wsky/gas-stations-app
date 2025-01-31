enum GetServiceStationsFilter: Hashable {
  case cheap
  case favorite
  case near
}

class GetServiceStationsUseCase {
  private let repository: ServiceStationRepository
  
  init(repository: ServiceStationRepository) {
    self.repository = repository
  }
  
  func run(_ filter: GetServiceStationsFilter) async -> [ServiceStation] {
    switch filter {
    case .cheap:
      return await repository.getSortedByPrice()
    case .favorite:
      return await repository.getFavorites(favorites: [])
    case .near:
      return await repository.getSortedByDistance()
    }
  }
}
