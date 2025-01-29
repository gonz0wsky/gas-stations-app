import SwiftUI

struct CoordinatorStack<CoordinatorPage: Coordinatable>: View {
    
    let root: CoordinatorPage
    
    @State private var coordinator = Coordinator<CoordinatorPage>()
    
    init(_ root: CoordinatorPage) {
        self.root = root
    }
    
    var body: some View {
        NavigationStack(path: $coordinator.path) {
            root
                .navigationDestination(for: CoordinatorPage.self) { $0 }
                .sheet(item: $coordinator.sheet) { $0 }
                .fullScreenCover(item: $coordinator.sheet) { $0 }
        }
        .environment(coordinator)
    }
}
