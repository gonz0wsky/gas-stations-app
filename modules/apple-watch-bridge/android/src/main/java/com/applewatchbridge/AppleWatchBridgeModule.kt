package com.applewatchbridge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AppleWatchBridgeModule.NAME)
class AppleWatchBridgeModule(reactContext: ReactApplicationContext) :
  NativeAppleWatchBridgeSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun isReachable(): Boolean {
    return false
  }

  companion object {
    const val NAME = "AppleWatchBridge"
  }
}
