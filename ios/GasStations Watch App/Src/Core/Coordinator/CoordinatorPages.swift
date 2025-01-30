import SwiftUI

enum CoordinatorPages: Coordinatable {
  var id: UUID { .init() }
  
  case home
  case serviceStationDetail(id: String)
  case serviceStationsList(filter: ServiceStationsListViewFilter)
  
  var body: some View {
    switch self {
    case .home:
      HomeView()
    case .serviceStationDetail(let stationId):
      ServiceStationDetailView(stationId: stationId)
    case .serviceStationsList(let listFilter):
      ServiceStationsListView(filter: listFilter)
    }
  }
}
