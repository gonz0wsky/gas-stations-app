import SwiftUI

enum CoordinatorPages: Coordinatable {
  var id: UUID { .init() }
  
  case home
  case stationDetail(id: String)
  case stationsList(filter: ListFilter)
  
  var body: some View {
    switch self {
    case .home:
      HomeView()
    case .stationDetail(let stationId):
      StationDetailView(stationId: stationId)
    case .stationsList(let listFilter):
      StationsListView(listFilter: listFilter)
    }
  }
}
