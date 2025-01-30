import SwiftUI

struct ServiceStationDetailView: View {
  
  var stationId: String
  
  var body: some View {
    Text("Station number \(stationId)")
  }
}

#Preview {
  ServiceStationDetailView(stationId: "1")
}
