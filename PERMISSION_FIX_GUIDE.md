# Permission Fix Guide - UPI QR Generator

## Changes Made to Fix Gallery Permission Issues

### 1. Updated Permission Handling (index.tsx)
- Improved permission request with detailed status checking
- Added better error messages for permission denial
- Implemented fallback handling for album creation
- Added console logging for debugging permission issues
- Better handling of Android 13+ permission model

### 2. Switched to captureRef API
- Changed from `ViewShot` component with `capture()` method to `captureRef()` function
- More reliable capture method that works better across different Android versions
- Better memory management and capture quality

### 3. Album Creation Handling
- Now checks if "UPI QR Codes" album exists before creating
- Uses `addAssetsToAlbumAsync` if album exists, `createAlbumAsync` if not
- Gracefully handles album operation failures (still saves to gallery)

### 4. App.json Permissions (Already Configured)
```json
"android": {
  "permissions": [
    "WRITE_EXTERNAL_STORAGE",
    "READ_EXTERNAL_STORAGE",
    "READ_MEDIA_IMAGES",
    "android.permission.READ_EXTERNAL_STORAGE",
    "android.permission.WRITE_EXTERNAL_STORAGE",
    "android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
    "android.permission.ACCESS_MEDIA_LOCATION",
    "android.permission.READ_MEDIA_IMAGES",
    "android.permission.READ_MEDIA_VIDEO",
    "android.permission.READ_MEDIA_AUDIO"
  ]
}
```

## How to Test the Permission Fix

### On Your Device:

1. **First Time Use**:
   - Generate a QR code
   - Tap "Save to Gallery"
   - You should see a permission dialog
   - Tap "Allow" or "While using the app"

2. **If Permission Was Denied**:
   - Go to device Settings
   - Find "Apps" or "Applications"
   - Find "UPI QR Generator"
   - Tap "Permissions"
   - Enable "Photos and videos" or "Storage"

3. **Check Console Logs**:
   - Open Expo Go app
   - Shake device to open developer menu
   - Tap "Show Element Inspector" or "Remote JS Debugging"
   - Check console for permission status logs

## Common Issues & Solutions

### Issue 1: "Insufficient Permission" Error
**Solution**: 
- The app will now show a clear message to enable permissions in settings
- Follow the steps in "If Permission Was Denied" above

### Issue 2: Permission Dialog Not Appearing
**Solution**:
- This happens if permission was previously denied
- Must manually enable in device settings
- Uninstall and reinstall the app to reset permissions

### Issue 3: "Failed to save QR code" Error
**Possible Causes**:
1. Storage is full - Free up some space
2. Permission denied - Check settings
3. Capture failed - Try generating QR again

**Debug Steps**:
- Check console logs for the exact error message
- Look for "Captured URI:" log to see if capture worked
- Look for "Asset created:" log to see if save started

### Issue 4: QR Code Saved but Can't Find It
**Solution**:
- Open your device's Photos/Gallery app
- Look for "UPI QR Codes" album
- If album creation failed, check "Downloads" or "Pictures" folder
- The image is still saved, just not in a custom album

## Android Version Differences

### Android 10-12:
- Uses `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`
- Album creation works smoothly

### Android 13+ (API 33+):
- Uses `READ_MEDIA_IMAGES` permission
- May have restrictions on album creation
- Image still saves to gallery, album feature may not work

## Testing Commands (For Development)

```bash
# Check if app is bundling correctly
cd /app/frontend && npx tsc --noEmit

# Restart expo to apply changes
sudo supervisorctl restart expo

# Check logs for errors
tail -50 /var/log/supervisor/expo.err.log
```

## Key Improvements in Code

### Before:
```typescript
const uri = await viewShotRef.current.capture();
```

### After:
```typescript
const uri = await captureRef(viewShotRef, {
  format: 'png',
  quality: 1,
});
```

### Better Permission Check:
```typescript
const { status, canAskAgain, granted } = await MediaLibrary.requestPermissionsAsync();

if (status !== 'granted') {
  if (!canAskAgain) {
    // Show message to enable in settings
  } else {
    // Show message to grant permission
  }
}
```

## What to Expect Now

✅ **Working Features**:
- Permission request dialog appears on first use
- Clear error messages if permission is denied
- QR code capture works reliably
- Image saves to device gallery
- Share functionality works

⚠️ **Known Limitations**:
- On some Android 13+ devices, album creation may not work (image still saves)
- Permission dialog only appears once per install
- Requires manual settings change if permission was denied

## Support

If you're still experiencing issues after these fixes:
1. Check the console logs (shake device → Show Element Inspector)
2. Note the exact error message
3. Check your Android version
4. Try uninstalling and reinstalling the app
5. Ensure device has sufficient storage space
