import SwiftUI

enum ServiceStationsListViewFilter: String {
  case cheap
  case favorites
  case near
}

struct ServiceStationsListView: View {
  
  var filter: ServiceStationsListViewFilter
  
  @State var vm = ServiceStationsListViewModel()
  
  var body: some View {
    ItemsList(options: vm.options) {
      print($0)
    }.onAppear {
      Task {
        await vm.load(filter)
      }
    }
  }
}

#Preview {
  ServiceStationsListView(filter: .cheap)
}
