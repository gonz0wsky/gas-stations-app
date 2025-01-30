import SwiftUI

let options: [Option] = [
  Option(id: ListFilter.near.rawValue, title: "Cercanos"),
  Option(id: ListFilter.cheap.rawValue, title: "Baratos"),
  Option(id: ListFilter.favorites.rawValue, title: "Favoritos")
]

struct HomeView: View {
  
  @Environment(Coordinator<CoordinatorPages>.self) private var coordinator
  
  let connec = PhoneConnection()
  
  var body: some View {
    ItemsList(options: options) { id in
      if let pressedId = ListFilter(rawValue: id) {
        coordinator.push(.stationsList(filter: pressedId))
      }
    }
  }}

#Preview {
  HomeView()
}
