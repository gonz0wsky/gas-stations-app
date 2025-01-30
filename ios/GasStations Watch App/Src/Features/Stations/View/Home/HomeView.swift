import SwiftUI

let options: [Option] = [
  Option(id: ServiceStationsListViewFilter.near.rawValue, title: "Cercanos"),
  Option(id: ServiceStationsListViewFilter.cheap.rawValue, title: "Baratos"),
  Option(id: ServiceStationsListViewFilter.favorites.rawValue, title: "Favoritos")
]

struct HomeView: View {
  
  @Environment(Coordinator<CoordinatorPages>.self) private var coordinator
    
  var body: some View {
    ItemsList(options: options) { id in
      if let pressedId = ServiceStationsListViewFilter(rawValue: id) {
        coordinator.push(.serviceStationsList(filter: pressedId))
      }
    }
  }}

#Preview {
  HomeView()
}
