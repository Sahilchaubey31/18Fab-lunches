# ShopEase APK Build Instructions

## ⚠️ Prerequisites Required

Before building the APK, you need to install:

### 1. **Android Studio** (Required)
- Download: https://developer.android.com/studio
- Install with Android SDK

### 2. **Java Development Kit (JDK)**
- Download: https://www.oracle.com/java/technologies/downloads/
- Version 11 or higher required

### 3. **Android SDK**
- Installed automatically with Android Studio
- Minimum SDK: 21 (Android 5.0)
- Target SDK: 33 (Android 13)

---

## 🔧 Setup Steps

### Step 1: Install Android Studio
1. Download from https://developer.android.com/studio
2. Run installer
3. Follow setup wizard
4. Install Android SDK when prompted

### Step 2: Set Environment Variables
1. Open System Environment Variables
2. Add `ANDROID_HOME` variable:
   - Value: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
3. Add to PATH: `%ANDROID_HOME%\platform-tools`

### Step 3: Verify Installation
```bash
adb --version
java -version
```

---

## 📦 Build APK

### Option 1: Using Command Line (Recommended)

**Debug APK (for testing):**
```bash
cd frontend/android
gradlew.bat assembleDebug
```

APK location: `app/build/outputs/apk/debug/app-debug.apk`

**Release APK (for Google Play):**
```bash
cd frontend/android
gradlew.bat assembleRelease
```

APK location: `app/build/outputs/apk/release/app-release.apk`

### Option 2: Using Android Studio

1. Open Android Studio
2. File → Open → Select `frontend/android` folder
3. Wait for Gradle sync to complete
4. Click "Run" button (green play icon)
5. Select device or emulator
6. APK will be built and installed automatically

---

## 📱 Install APK on Device

### Via Command Line:
```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

### Via Android Studio:
1. Connect device via USB
2. Enable USB Debugging on device
3. Click Run button in Android Studio
4. Select your device

---

## 🎯 APK Details

- **App Name:** ShopEase
- **Package:** com.shopease.app
- **Min SDK:** 21 (Android 5.0)
- **Target SDK:** 33 (Android 13)
- **Size:** ~50-60 MB (debug), ~30-40 MB (release)

---

## ✅ What's Included in APK

✅ Full e-commerce website
✅ Product catalog with search
✅ Shopping cart
✅ Wishlist
✅ User authentication
✅ Checkout & payment
✅ Product reviews & ratings
✅ Image gallery
✅ Responsive design
✅ All pages and features

---

## 🚀 Next Steps

1. **Test on Device:**
   - Install APK on Android phone
   - Test all features
   - Check responsiveness

2. **For Google Play Store:**
   - Create signing key
   - Build release APK
   - Create Google Play account
   - Upload APK
   - Fill store listing
   - Submit for review

3. **Troubleshooting:**
   - Clear Gradle cache: `gradlew.bat clean`
   - Rebuild: `gradlew.bat assembleDebug`
   - Check Android SDK version compatibility

---

## 📞 Support

- Android Studio Help: https://developer.android.com/studio/intro
- Gradle Documentation: https://gradle.org/
- Capacitor Docs: https://capacitorjs.com/docs/android

---

## ⚡ Quick Commands

```bash
# Navigate to android folder
cd frontend/android

# Clean build
gradlew.bat clean

# Build debug APK
gradlew.bat assembleDebug

# Build release APK
gradlew.bat assembleRelease

# Install on device
adb install app/build/outputs/apk/debug/app-debug.apk

# View connected devices
adb devices

# Clear app data
adb shell pm clear com.shopease.app
```

---

**Your APK is ready to build! Follow the steps above to create and install it on your Android device.** 🎉
