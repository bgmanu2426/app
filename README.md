# 📱 UPI QR Generator

<div align="center">

![UPI QR Generator](frontend/assets/images/icon.png)

**Instantly generate UPI payment QR codes with a beautiful, user-friendly mobile app.**

[![React Native](https://img.shields.io/badge/React%20Native-000?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000?logo=expo&logoColor=white)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

[Features](#-features) • [Getting Started](#-getting-started) • [How to Use](#-how-to-use) • [Tech Stack](#-tech-stack)

</div>

---

## ✨ Features

🎯 **Quick QR Generation**
- Generate UPI payment QR codes instantly
- No internet required for generation
- Based on standard UPI payment protocol

💾 **Save to Gallery**
- Save QR codes directly to your device's photo gallery
- Creates a dedicated "UPI QR Codes" album
- One-tap save functionality

📤 **Easy Sharing**
- Share QR codes via WhatsApp, Email, SMS, or any app
- PNG format for maximum compatibility
- Instant sharing with secure payment links

✅ **Smart Validation**
- Validates UPI ID format (e.g., `user@paytm`)
- Ensures valid payment amounts
- Clear, helpful error messages

🎨 **Beautiful UI**
- Modern, mobile-first design
- Smooth animations and transitions
- Fully responsive interface
- Dark-mode ready

🔒 **Privacy First**
- No data collection or storage
- All QR generation happens locally on your device
- No backend tracking

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app installed on your device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bgmanu2426/upi-qr-gen.git
   cd upi-qr-gen
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

3. **Start the Expo development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device**
   - **Android**: Press `a` in the terminal or scan the QR code with Android Expo Go
   - **iOS**: Press `i` in the terminal or scan the QR code with iPhone camera
   - **Web**: Press `w` in the terminal to open in your default browser

---

## 📖 How to Use

1. **Enter UPI ID**
   - Format: `username@bankname` (e.g., `john@paytm`, `merchant@ybl`)
   - Any valid NPCI-registered bank abbreviation works

2. **Enter Amount**
   - Enter the payment amount in Indian Rupees (₹)
   - Supports any positive amount

3. **Generate QR Code**
   - Tap the "Generate QR Code" button
   - QR code appears instantly

4. **Save or Share**
   - **Save to Gallery**: Store the QR code in your photos
   - **Share**: Send via any installed app
   - **Generate New**: Create another QR code

### Example UPI IDs
```
john@paytm          (PayTM)
merchant@ybl        (Google Pay - Bangalore Bank)
user@okhdfcbank     (HDFC Bank)
business@okaxis     (Axis Bank)
```

---

## 🏗️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and runtime
- **React Router** - Navigation and routing
- **react-native-qrcode-svg** - QR code generation
- **expo-media-library** - Gallery access
- **expo-sharing** - Share functionality
- **expo-file-system** - File operations
- **react-native-view-shot** - Image capture

### Backend (Optional API)
- **FastAPI** - Python web framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **CORS Middleware** - Cross-origin support

---

## 📦 Project Structure

```
upi-qr-gen/
├── frontend/                 # React Native/Expo app
│   ├── app/
│   │   └── index.tsx        # Main app component
│   ├── assets/              # Images, fonts
│   ├── package.json         # Dependencies
│   └── tsconfig.json        # TypeScript config
├── backend/                 # Optional FastAPI backend
│   ├── server.py           # API server
│   └── requirements.txt     # Python dependencies
├── tests/                   # Test files
└── README.md               # This file
```

---

## 🔧 Available Scripts

### Frontend
```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run reset-project  # Reset to template
```

### Backend
```bash
python server.py   # Start FastAPI server
```

---

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| iOS | ✅ Complete | iPhone, iPad |
| Android | ✅ Complete | Phone, Tablet |
| Web | ✅ UI Testing | Gallery save limited |

---

## 🔐 Permissions

The app requests the following permissions:

- **Storage/Media Access** (Android & iOS)
  - Required to save QR codes to your photo gallery
  - Only requested when you first attempt to save

---

## 🎯 UPI Integration Details

### Generated UPI URL Format
```
upi://pay?pa=<upi_id>&mc=0000&mode=02&purpose=00&am=<amount>&cu=INR
```

**Parameters:**
- `pa` - Payee address (UPI ID)
- `am` - Transaction amount
- `cu` - Currency (INR)
- `mc` - Merchant category code
- `mode` - Request mode
- `purpose` - Transaction purpose

### QR Code Compatibility
- ✅ Google Pay
- ✅ PhonePe
- ✅ Paytm
- ✅ WhatsApp Pay
- ✅ BHIM
- ✅ All NPCI-registered UPI apps

---

## 🚀 Future Enhancements

- [ ] Pre-saved UPI profiles for quick access
- [ ] Transaction notes/description field
- [ ] Dark mode support
- [ ] Multiple QR code styles and customization
- [ ] Transaction history
- [ ] Batch QR code generation
- [ ] Dynamic payment links

---

## 💡 Tips & Tricks

- **Offline Usage**: QR generation works completely offline
- **Multiple QR Codes**: Generate different QR codes for different purposes
- **Sharing**: Share QR codes via social media, email, or print them
- **Testing**: Scan generated QR codes with any UPI app to test functionality

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support, issues, or suggestions:
- Open an issue on [GitHub](https://github.com/bgmanu2426/upi-qr-gen/issues)
- Contact the maintainers

---

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) community
- [Expo](https://expo.dev/) for excellent tooling
- [UPI](https://www.npci.org.in/what-we-do/upi) specification and documentation

---

<div align="center">

**Made with ❤️ by the community**

[⬆ back to top](#-upi-qr-generator)

</div>
