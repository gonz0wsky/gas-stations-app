import SwiftUI

enum ListFilter: String {
  case cheap
  case favorites
  case near
}

struct StationsListView: View {
  
  var listFilter: ListFilter
  
  var body: some View {
    Text("This list contains \(listFilter)")
  }
}

#Preview {
  StationsListView(listFilter: .near)
}
