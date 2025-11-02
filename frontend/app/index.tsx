import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import ViewShot, { captureRef } from 'react-native-view-shot';

export default function Index() {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);
  const viewShotRef = useRef<View>(null);

  // Validate UPI ID format (user@bank)
  const validateUpiId = (id: string): boolean => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
    return upiRegex.test(id);
  };

  // Generate QR Code
  const handleGenerateQR = () => {
    // Validate inputs
    if (!upiId.trim()) {
      Alert.alert('Error', 'Please enter UPI ID');
      return;
    }

    if (!validateUpiId(upiId.trim())) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI ID (e.g., user@bank)');
      return;
    }

    if (!amount.trim()) {
      Alert.alert('Error', 'Please enter amount');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0');
      return;
    }

    // Generate UPI URL
    const upiUrl = `upi://pay?pa=${upiId.trim()}&mc=0000&mode=02&purpose=00&am=${amount.trim()}&cu=INR`;
    setQrValue(upiUrl);
    setShowQR(true);
  };

  // Save QR Code to Gallery
  const handleSaveToGallery = async () => {
    try {
      setLoading(true);
      
      // Request permissions - try both old and new permission types for Android 13+
      const { status, canAskAgain, granted } = await MediaLibrary.requestPermissionsAsync();
      
      console.log('Permission status:', { status, canAskAgain, granted });
      
      if (status !== 'granted') {
        if (!canAskAgain) {
          Alert.alert(
            'Permission Required',
            'Please enable gallery permissions in your device settings to save QR codes.',
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert(
            'Permission Denied',
            'Gallery access is required to save QR codes. Please grant permission.',
            [{ text: 'OK' }]
          );
        }
        setLoading(false);
        return;
      }

      // Capture the view as image using captureRef
      if (viewShotRef.current) {
        console.log('Capturing QR code...');
        const uri = await captureRef(viewShotRef, {
          format: 'png',
          quality: 1,
        });
        console.log('Captured URI:', uri);
        
        // Save to media library
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log('Asset created:', asset.id);
        
        // Try to create album, but don't fail if it already exists
        try {
          const album = await MediaLibrary.getAlbumAsync('UPI QR Codes');
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          } else {
            await MediaLibrary.createAlbumAsync('UPI QR Codes', asset, false);
          }
        } catch (albumError) {
          console.log('Album handling:', albumError);
          // Album operations might fail on some devices, but asset is still saved
        }
        
        Alert.alert('Success', 'QR Code saved to gallery!');
      } else {
        Alert.alert('Error', 'Unable to capture QR code. Please try again.');
      }
    } catch (error: any) {
      console.error('Error saving to gallery:', error);
      Alert.alert(
        'Error', 
        `Failed to save QR code: ${error.message || 'Unknown error'}\n\nPlease check app permissions in settings.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Share QR Code
  const handleShare = async () => {
    try {
      setLoading(true);
      
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'Sharing is not available on this device');
        setLoading(false);
        return;
      }

      // Capture the view as image using captureRef
      if (viewShotRef.current) {
        const uri = await captureRef(viewShotRef, {
          format: 'png',
          quality: 1,
        });
        
        // Share the image
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
          dialogTitle: 'Share UPI QR Code',
        });
      } else {
        Alert.alert('Error', 'Unable to capture QR code. Please try again.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share QR code');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setUpiId('');
    setAmount('');
    setQrValue('');
    setShowQR(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>UPI QR Generator</Text>
            <Text style={styles.subtitle}>Generate QR codes for easy payments</Text>
          </View>

          {/* Input Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>UPI ID</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., user@paytm"
                value={upiId}
                onChangeText={setUpiId}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 500"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerateQR}
              activeOpacity={0.8}
            >
              <Text style={styles.generateButtonText}>Generate QR Code</Text>
            </TouchableOpacity>
          </View>

          {/* QR Code Display */}
          {showQR && qrValue && (
            <View style={styles.qrContainer}>
              <ViewShot
                ref={viewShotRef}
                options={{ format: 'png', quality: 1 }}
                style={styles.qrWrapper}
              >
                <View style={styles.qrInnerWrapper}>
                  <Text style={styles.qrTitle}>Scan to Pay</Text>
                  <View style={styles.qrCodeBox}>
                    <QRCode value={qrValue} size={200} />
                  </View>
                  <View style={styles.qrDetails}>
                    <Text style={styles.qrDetailText}>UPI ID: {upiId}</Text>
                    <Text style={styles.qrDetailText}>Amount: ₹{amount}</Text>
                  </View>
                </View>
              </ViewShot>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.saveButton]}
                  onPress={handleSaveToGallery}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.actionButtonText}>Save to Gallery</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.shareButton]}
                  onPress={handleShare}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.actionButtonText}>Share</Text>
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
                activeOpacity={0.8}
              >
                <Text style={styles.resetButtonText}>Generate New QR</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  generateButton: {
    backgroundColor: '#5f27cd',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  qrInnerWrapper: {
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  qrCodeBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#5f27cd',
  },
  qrDetails: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrDetailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#27ae60',
  },
  shareButton: {
    backgroundColor: '#3498db',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 16,
    padding: 12,
  },
  resetButtonText: {
    color: '#5f27cd',
    fontSize: 16,
    fontWeight: '600',
  },
});
