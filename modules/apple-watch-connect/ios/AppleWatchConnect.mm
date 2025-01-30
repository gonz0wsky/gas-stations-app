#import "AppleWatchConnect.h"
#import "react_native_apple_watch_connect-Swift.h"

@implementation AppleWatchConnect {
    AppleWatchImpl *appleWatchImpl;
}

- (instancetype) init {
    self = [super init];
    if (self) {
        appleWatchImpl = [AppleWatchImpl new];
    }
    return self;
}

RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAppleWatchConnectSpecJSI>(params);
}

- (nonnull NSNumber *)isWatchReachable {
    return [appleWatchImpl isWatchReachable];
}

- (void)updateStations:(nonnull NSArray *)cheap favorites:(nonnull NSArray *)favorites near:(nonnull NSArray *)near { 
    return [appleWatchImpl updateStations:cheap favorites:favorites near:near];
}


@end
