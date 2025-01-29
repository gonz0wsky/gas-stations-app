import SwiftUI

@main
struct GasStationsWatch_Watch_AppApp: App {
    var body: some Scene {
        WindowGroup {
          CoordinatorStack(CoordinatorPages.home)
        }
    }
}
