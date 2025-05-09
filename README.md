# Hamilton Waterfalls & Campus Map App

This React Native application is an interactive map-based guide to explore **Hamilton's waterfalls and local campuses**. Users can view, search, and get directions to various natural and academic landmarks around the Hamilton area.


## 📱 Features

- 🗺️ **Interactive Map View** powered by `react-native-maps`.
- 📍 **Waterfall Markers** displayed by community (Hamilton, Dundas, Ancaster, etc).
- 🎓 **Campus Markers** for colleges and universities in the region.
- 📸 **Search for Places** using Google Places Autocomplete, complete with photo preview.
- 📌 **Current Location Detection** using Expo Location.
- 🧭 **Floating Action Buttons (FAB)** to quickly navigate between communities or reset the map.
- 📑 **Detailed Modals** show information and images for selected locations.

## ⚙️ Technologies Used

- **React Native** with Expo
- **react-native-maps**
- **react-native-google-places-autocomplete**
- **expo-location**
- **react-native-paper**
- **expo-blur**

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the app**:
   ```bash
   npx expo start
   ```

3. **Set up your Google Maps API key**:
   - You need a key that supports:
     - Places API
     - Maps SDK for Android/iOS
     - Place Photos API
   - Add your API key inside the code where it says:
     ```js
     const mapsAPI = 'YOUR_GOOGLE_MAPS_API_KEY';
     ```

## 🏞️ Screens Overview

- **Map Screen**: Main screen with interactive pins.
- **Waterfall Modal**: Details about each waterfall including title, image, and description.
- **Campus Modal**: Shows details about local campuses.
- **Search Modal**: Displays results and photos for searched places.
- **Location Modal**: Pops up when your current location is tapped.

## 🧪 Development Notes

- Waterfalls are loaded based on selected community.
- Campuses load on app start (make sure the `<CampusMarkers />` component is rendered **before** `<MapView>`).
- Community pin icons are mapped using the `communityPin` object.
- A loading screen is shown briefly on app launch for a polished user experience.

## 📌 To Do / Future Improvements

- Add filter or category toggles for different types of locations.
- Implement directions with real-time navigation.
- Include user-submitted locations and photos.
- Offline support with local map caching.

## 📄 License

MIT License – Feel free to use and modify.

