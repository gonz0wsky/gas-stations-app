import SwiftUI

struct StationDetailView: View {
  
  var stationId: String
  
  var body: some View {
    Text("Station number \(stationId)")
  }
}

#Preview {
  StationDetailView(stationId: "1")
}
