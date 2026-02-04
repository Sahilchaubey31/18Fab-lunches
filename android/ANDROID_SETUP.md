# Android E-Commerce App Setup

## Prerequisites
- Android Studio (latest version)
- Android SDK 34
- Kotlin 1.9.0
- JDK 17

## Project Structure
```
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/ecommerce/app/
│   │       │   ├── api/
│   │       │   │   ├── ApiService.kt
│   │       │   │   └── RetrofitClient.kt
│   │       │   ├── models/
│   │       │   │   └── Product.kt
│   │       │   ├── ui/
│   │       │   │   └── ProductViewModel.kt
│   │       │   └── MainActivity.kt
│   │       ├── res/
│   │       │   ├── values/
│   │       │   │   ├── strings.xml
│   │       │   │   └── themes.xml
│   │       │   └── mipmap-hdpi/
│   │       └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
├── settings.gradle
└── gradle.properties
```

## Setup Instructions

1. Open Android Studio
2. Select "Open an Existing Project"
3. Navigate to `18Fab-lunches/android`
4. Wait for Gradle sync to complete

## Configuration

### Update API Base URL
Edit `RetrofitClient.kt` to match your backend URL:
```kotlin
private const val BASE_URL = "https://your-backend-url/"
```

### Network Security
For development with self-signed certificates, create `res/xml/network_security_config.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">localhost</domain>
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </domain-config>
</network-security-config>
```

## Build & Run

### Debug Build
```bash
cd android
./gradlew assembleDebug
```

### Release Build
```bash
cd android
./gradlew assembleRelease
```

### Run on Emulator
```bash
./gradlew installDebug
adb shell am start -n com.ecommerce.app/.MainActivity
```

## Features
- Product listing with Jetpack Compose
- Retrofit API integration
- MVVM architecture with ViewModel
- Coroutines for async operations
- Material Design 3 UI

## Dependencies
- Jetpack Compose
- Retrofit 2
- OkHttp 3
- Kotlin Coroutines
- AndroidX libraries
