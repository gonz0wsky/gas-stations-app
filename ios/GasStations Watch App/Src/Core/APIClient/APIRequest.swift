import Foundation

class APIRequest {
  
  private let cacheExpiration: TimeInterval
  private let cacheKey: String
  private let url: String
  
  init(_ url: String, cacheKey: String, cacheExpiration: TimeInterval) {
    self.url = url
    self.cacheKey = cacheKey
    self.cacheExpiration = cacheExpiration
  }
  
  func get<T: Codable>() async throws -> T? {
    if let cachedData: Data = Cache.shared.get(forKey: cacheKey) {
      do {
        if let cacheDictionary = try JSONSerialization.jsonObject(with: cachedData, options: []) as? [String: Any],
           let timestamp = cacheDictionary["timestamp"] as? TimeInterval,
           let jsonData = cacheDictionary["data"] as? String {
          
          if Date().timeIntervalSince1970 - timestamp < cacheExpiration,
             let jsonString = jsonData.data(using: .utf8) {
            let json = try JSONDecoder().decode(T.self, from: jsonString )
            return json as T
          }
          
        }
      }
    }
    
    let url = URL(string: self.url)!
    let (data, _) = try await URLSession.shared.data(from: url)
    let json = try JSONDecoder().decode(T.self, from: data)
    
    if let stringData = String(data: data, encoding: .utf8) {
      let cacheData: [String: Any] = [
        "timestamp": Date().timeIntervalSince1970,
        "data": stringData
      ]
      let serializedData = try JSONSerialization.data(withJSONObject: cacheData, options: .prettyPrinted)
      Cache.shared.set(serializedData, forKey: cacheKey)
    }
    
    
    
    return json
  }
}
