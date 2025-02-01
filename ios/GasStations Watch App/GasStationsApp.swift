import SwiftUI

@main
struct GasStations_Watch_App: App {
    var body: some Scene {
        WindowGroup {
          CoordinatorStack(CoordinatorPages.home)
        }
    }
}
