#import "RCTNativeBridge.h"

@implementation RCTNativeBridge

RCT_EXPORT_MODULE(NativeBridge)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeBridgeSpecJSI>(params);
}

- (void)sendEvent:(NSString *)event {
  NSLog(@"%@", event);
}

@end
