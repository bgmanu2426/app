# UPI QR Generator Mobile App

A React Native mobile application built with Expo that generates UPI payment QR codes for easy and quick payments.

## Features

✅ **Generate UPI QR Codes**
- Enter UPI ID and amount
- Instantly generate scannable QR codes
- Based on standard UPI payment protocol

✅ **Save to Gallery**
- Save QR codes directly to your device's photo gallery
- Creates a dedicated "UPI QR Codes" album
- Requires storage permissions (asked on first use)

✅ **Share QR Codes**
- Share QR codes through WhatsApp, Email, or any installed app
- PNG format for best compatibility
- Easy one-tap sharing

✅ **Input Validation**
- Validates UPI ID format (e.g., user@paytm)
- Ensures amount is valid and greater than 0
- Clear error messages for invalid inputs

✅ **Clean Professional UI**
- Modern, mobile-first design
- Responsive layout
- Easy to use interface

## How to Use

1. **Enter UPI ID**: Type your UPI ID in the format `user@bank` (e.g., `john@paytm`, `merchant@ybl`)

2. **Enter Amount**: Enter the payment amount in rupees (₹)

3. **Generate QR Code**: Tap the "Generate QR Code" button

4. **Save or Share**:
   - Tap "Save to Gallery" to save the QR code to your photos
   - Tap "Share" to share the QR code via any app
   - Tap "Generate New QR" to create another QR code

## Technical Details

### UPI URL Format
The app generates QR codes using the standard UPI payment URL:
```
upi://pay?pa=<upi_id>&mc=0000&mode=02&purpose=00&am=<amount>&cu=INR
```

### Libraries Used
- **react-native-qrcode-svg**: QR code generation
- **expo-sharing**: Share functionality
- **expo-media-library**: Gallery access and saving
- **react-native-view-shot**: Capture QR as image
- **react-native-svg**: Vector graphics support

### Permissions Required
- **Storage/Media Access**: To save QR codes to gallery (Android & iOS)
- The app will request permissions when you first try to save a QR code

## Testing on Your Device

### Using Expo Go App
1. Install Expo Go from:
   - iOS: App Store
   - Android: Google Play Store

2. Scan the QR code shown in the terminal or web interface

3. The app will load on your device

### Web Preview
The app also works in web browsers for testing the UI (Note: Gallery save may not work on web)

## Platform Support
- ✅ iOS (iPhone, iPad)
- ✅ Android (Phone, Tablet)
- ✅ Web (for testing UI only)

## Notes
- QR codes are generated instantly - no internet required for generation
- Saved QR codes can be scanned by any UPI-compatible payment app
- The app does not store any payment history or data
- All QR generation happens locally on your device

## Future Enhancements (Optional)
- Pre-saved UPI IDs for quick access
- Transaction notes/description field
- Dark mode support
- Multiple QR code styles
