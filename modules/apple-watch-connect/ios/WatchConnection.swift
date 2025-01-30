import Foundation
import WatchConnectivity

class WatchConnection: NSObject, WCSessionDelegate {
    
    static let shared = WatchConnection()
    
    override init() {
        super.init()
        if WCSession.isSupported() {
            let session = WCSession.default
            session.delegate = self
            session.activate()
        }
    }
    
   func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: (any Error)?) {
        // noop
    }
    
   func sessionDidBecomeInactive(_ session: WCSession) {
        // noop
    }
    
    func sessionDidDeactivate(_ session: WCSession) {
        // noop
    }
    
    public func isReachable() -> Bool {
        return WCSession.default.isReachable
    }
    
    public func updateStations(cheap: [ServiceStation], favorites: [ServiceStation], near: [ServiceStation]) {
        if let encodedCheapStations = try? JSONEncoder().encode(cheap) {
            let json = String(data: encodedCheapStations, encoding: .utf8)
            WCSession.default.sendMessage(["update-cheap-stations": json ?? ""], replyHandler: nil, errorHandler: nil)
        }
        
        if let encodedFavoritesStations = try? JSONEncoder().encode(favorites) {
            let json = String(data: encodedFavoritesStations, encoding: .utf8)
            WCSession.default.sendMessage(["update-favorites-stations": json ?? ""], replyHandler: nil, errorHandler: nil)
        }
        
        if let encodedNearStations = try? JSONEncoder().encode(cheap) {
            let json = String(data: encodedNearStations, encoding: .utf8)
            WCSession.default.sendMessage(["update-near-stations": json ?? ""], replyHandler: nil, errorHandler: nil)
        }
    }
    
    
}
