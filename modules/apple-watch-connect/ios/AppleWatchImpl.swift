import Foundation

func serializeList(_ json: NSArray) -> [ServiceStation] {
    do {
        let data = try JSONSerialization.data(withJSONObject: json, options: []);
        let list: [ServiceStation] = try JSONDecoder().decode([ServiceStation].self, from: data)
        return list
    } catch {
        return []
    }
}

@objc public class AppleWatchImpl: NSObject {
    
    let watch = WatchConnection()
    
    @objc public func isWatchReachable() -> NSNumber {
        return NSNumber(value: watch.isReachable())
    }
    
    @objc public func updateStations(_ cheap: NSArray, favorites: NSArray, near: NSArray) {
        let cheapStations = serializeList(cheap)
        let favoriteStations = serializeList(favorites)
        let nearStations = serializeList(near)
        
        watch.updateStations(cheap: cheapStations, favorites: favoriteStations, near: nearStations)
    }
}
