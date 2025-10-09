# Cache Clearing Instructions for Chrome Profiles

## Why Some Chrome Profiles Show Older Versions

Your website uses a Service Worker for caching, which can cause different Chrome profiles to show different versions of your site. Here's how to fix this:

## Immediate Solutions

### 1. Clear Cache for Specific Chrome Profile
1. Open Chrome with the problematic profile
2. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
3. Select "All time" as the time range
4. Check "Cached images and files"
5. Click "Clear data"

### 2. Force Service Worker Update
1. Open Developer Tools (`F12`)
2. Go to Application tab
3. Click "Service Workers" in the left sidebar
4. Find your domain and click "Unregister"
5. Refresh the page

### 3. Hard Refresh
- Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- This bypasses cache for that session

## Long-term Solutions (Already Implemented)

✅ **Updated Service Worker Cache Version**: Changed from `grow-ai-v2` to `grow-ai-v3`
✅ **Improved Cache Strategy**: HTML files now fetch from network first
✅ **Added Cache Busting**: Updated version parameters to `v=1759850000`
✅ **Auto-reload on Updates**: Service worker now forces page reload when new content is available

## Testing Steps

1. **Test in Incognito Mode**: Open your site in incognito mode - it should show the latest version
2. **Check Different Profiles**: Test across multiple Chrome profiles
3. **Verify Service Worker**: Check DevTools > Application > Service Workers to see the active version

## If Issues Persist

If some profiles still show old content:

1. **Disable Service Worker Temporarily**:
   - Go to DevTools > Application > Service Workers
   - Check "Offline" to disable
   - Refresh the page

2. **Clear All Site Data**:
   - Go to DevTools > Application > Storage
   - Click "Clear site data"

3. **Force Service Worker Update**:
   - The new service worker will automatically update and reload the page

## Prevention

The implemented changes will prevent this issue in the future by:
- Always fetching HTML files from the network first
- Automatically updating the service worker when new content is available
- Using version parameters to bust cache for CSS and JS files
