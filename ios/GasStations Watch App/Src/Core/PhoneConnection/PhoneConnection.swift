import Foundation
import WatchConnectivity

class PhoneConnection: NSObject, WCSessionDelegate, ObservableObject {
  static let shared = PhoneConnection()
  
  override init() {
    super.init()
    if WCSession.isSupported() {
      WCSession.default.delegate = self
      WCSession.default.activate()
    }
  }
  
  func session(_ session: WCSession, activationDidCompleteWith state: WCSessionActivationState, error: Error?) {
    if let error = error {
      print("Error activando WCSession: \(error.localizedDescription)")
    } else {
      print("WCSession activada con estado: \(state.rawValue)")
    }
  }
  
  // 2. Manejar mensajes recibidos
  func session(_ session: WCSession, didReceiveMessage message: [String: Any], replyHandler: @escaping ([String: Any]) -> Void) {
    print("📩 Mensaje recibido: \(message)")
    
    // Responder si es necesario
    replyHandler(["response": "Mensaje recibido correctamente"])
  }
  
  // 3. Manejar errores de entrega
  func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String : Any]) {
    print("📦 Contexto recibido: \(applicationContext)")
  }
  
  // 4. Si el estado de la sesión cambia (por ejemplo, Watch se conecta o desconecta)
  func sessionReachabilityDidChange(_ session: WCSession) {
    print("📡 Estado de conexión cambió: \(session.isReachable)")
  }
  
  // 5. Necesario para recibir datos en segundo plano
  func session(_ session: WCSession, didReceiveMessageData messageData: Data) {
    print("📥 Datos recibidos: \(messageData)")
  }
  
}
