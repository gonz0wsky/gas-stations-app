import Foundation

class Cache {
  static let shared = Cache()
  private let cache = NSCache<NSString, NSData>()
  
  private init() {}
  
  func set<T>(_ object: T, forKey key: String) {
    cache.setObject((object as AnyObject) as! NSData, forKey: key as String as NSString)
  }
  
  func get<T>(forKey key: String) -> T? {
    let data = cache.object(forKey: key as String as NSString) as? T
    return data
  }
  
  func clear(forKey key: String) {
    cache.removeObject(forKey: key as String as NSString)
  }
}
