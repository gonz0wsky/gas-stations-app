import SwiftUI

struct Option: Identifiable {
  let id: String
  let title: String
}

struct Item: View {
  var option: Option
  var onPress: (_ id: String) -> Void
  
  var body: some View {
    Button(option.title) {
      onPress(option.id)
    }
  }
}

struct ItemsList: View {
  var options: [Option]
  var onPress: (_ id: String) -> Void
  
  var body: some View {
    List(options) {
      Item(option: $0, onPress: onPress)
    }
  }
}

#Preview {
  ItemsList(options: []) {id in
    print(id)
  }
}
