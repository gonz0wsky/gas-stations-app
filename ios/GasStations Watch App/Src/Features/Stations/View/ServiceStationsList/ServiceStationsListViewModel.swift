import Foundation

let getFilter: [ServiceStationsListViewFilter: GetServiceStationsFilter] = [
  .cheap: .cheap,
  .favorites: .favorite,
  .near: .near
]

@Observable
class ServiceStationsListViewModel {
  
  var options: [Option] = []
  
  private let getServiceStationsUseCase: GetServiceStationsUseCase
  
  init() {
    let repository = ServiceStationRespositoryImpl()
    self.getServiceStationsUseCase = GetServiceStationsUseCase(repository: repository)
  }
  
  func load(_ filter: ServiceStationsListViewFilter) async {
    let serviceStations = await self.getServiceStationsUseCase.run(getFilter[filter] ?? .cheap)
    let optionsList = serviceStations.map { item in
      Option(id: item.id, title: item.name)
    }
    
    options = optionsList
  }
  
}
