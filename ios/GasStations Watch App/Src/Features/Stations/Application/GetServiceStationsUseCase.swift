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
  
  func run(_ filter: GetServiceStationsFilter) -> [ServiceStation] {
    switch filter {
    case .cheap:
      return repository.getSortedByPrice()
    case .favorite:
      return repository.getFavorites()
    case .near:
      return repository.getSortedByDistance()
    }
  }
}
