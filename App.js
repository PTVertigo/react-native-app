// StAuth10244: I Pouya Tayyari, 000949516 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { useState, useEffect } from 'react';
import {
  Text,
  Image,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { Provider, FAB } from 'react-native-paper';
import { BlurView } from 'expo-blur';

import { styles } from './components/styles';
import WaterfallMarkers from './components/WaterfallMarkers';
import WaterfallModal from './components/WaterfallModal';
import CampusModal from './components/CampusModal';
import CampusMarkers from './components/CampusMarkers';
import LoadingScreen from './components/loadingScreen';

export default function App() {
  const [region, setRegion] = useState({
    latitude: 43.2557,
    longitude: -79.8711,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const mapsAPI = '';
  const [location, setLocation] = useState(null);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [customMarkers, setCustomMarkers] = useState([]);
  const [campusMarkers, setCampusMarkers] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [isCampusModalVisible, setCampusModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchMarker, setSearchMarker] = useState(null);
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [appReady, setAppReady] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [searchPhotoUrl, setSearchPhotoUrl] = useState(null);

  useEffect(() => {
    const prepareApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppReady(true);
    };

    prepareApp();
  }, []);
  if (!appReady || showLoadingScreen) {
    return <LoadingScreen onFinish={() => setShowLoadingScreen(false)} />;
  }

  const resetAppState = () => {
    setRegion({
      latitude: 43.2557,
      longitude: -79.8711,
      latitudeDelta: 1,
      longitudeDelta: 1,
    });
    setLocation(null);
    setSearchMarker(null);
    setSearchAddress('');
    setSearchPhotoUrl(null);
    setCustomMarkers([]);
    setSelectedCommunity(null);
    setSelectedMarker(null);
    setSelectedCampus(null);
    setModalVisible(false);
    setCampusModalVisible(false);
    setLocationModalVisible(false);
    setSearchModalVisible(false);
  };

  const communityPin = {
    Hamilton: require('./assets/letter-h.png'),
    Dundas: require('./assets/letter-d.png'),
    Ancaster: require('./assets/letter-a.png'),
    'Stoney Creek': require('./assets/letter-c.png'),
    Flamborough: require('./assets/letter-f.png'),
    Burlington: require('./assets/letter-b.png'),
  };

  const communityDeltas = {
    Hamilton: { latitudeDelta: 0.3, longitudeDelta: 0.3 },
    Dundas: { latitudeDelta: 0.15, longitudeDelta: 0.15 },
    Ancaster: { latitudeDelta: 0.15, longitudeDelta: 0.15 },
    'Stoney Creek': { latitudeDelta: 0.3, longitudeDelta: 0.3 },
    Flamborough: { latitudeDelta: 0.2, longitudeDelta: 0.2 },
    Burlington: { latitudeDelta: 0.09, longitudeDelta: 0.09 },
  };

  const handleGetCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setSearchMarker(null);
      setSearchAddress('');
      setSearchModalVisible(false);
    } catch {
      alert('Failed to get current location');
    }
  };
  
  const fetchPhotoUrl = (photoReference) => {
    if (!photoReference) {
      setSearchPhotoUrl(null);
      return;
    }
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${mapsAPI}`;
    setSearchPhotoUrl(url);
  };

  return (
    <Provider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {menuVisible && (
            <BlurView
              intensity={50}
              tint="light"
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
              }}
            />
          )}
          {/* Campus Markers */}
          <CampusMarkers setCampusMarkers={setCampusMarkers} />
          {/* MapView Starts here */}
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}>
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                onPress={() => setLocationModalVisible(true)}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('./assets/placeholder.png')}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            )}

            {customMarkers.map((marker, index) => (
              <Marker
                key={`marker-${index}`}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() => {
                  setSelectedMarker(marker);
                  setModalVisible(true);
                }}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={communityPin[marker.community]}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            ))}

            {campusMarkers.map((campus, index) => (
              <Marker
                key={`campus-${index}`}
                coordinate={{
                  latitude: campus.latitude,
                  longitude: campus.longitude,
                }}
                onPress={() => {
                  setSelectedCampus(campus);
                  setCampusModalVisible(true);
                }}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('./assets/graduate.png')}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            ))}
            {searchMarker && (
              <Marker
                coordinate={searchMarker}
                onPress={() => setSearchModalVisible(true)}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('./assets/location.png')}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            )}
          </MapView>
          {/* FAB (Floating Action Buttons) Group */}
          <FAB.Group
            visible
            open={menuVisible}
            icon={menuVisible ? 'close' : 'menu'}
            onStateChange={({ open }) => setMenuVisible(open)}
            backdropColor="transparent"
            fabStyle={{ backgroundColor: '#2196F3' }}
            style={styles.fab}
            actions={[
              {
                icon: 'map-marker',
                label: 'Hamilton',
                onPress: () => setSelectedCommunity('Hamilton'),
                labelTextColor: '#103A7B',
                style: { backgroundColor: '#84E3EF' },
                labelStyle: { fontWeight: 'bold', fontSize: 24 },
              },
              {
                icon: 'map-marker',
                label: 'Dundas',
                onPress: () => setSelectedCommunity('Dundas'),
                labelTextColor: '#103A7B',
                style: { backgroundColor: '#84E3EF' },
                labelStyle: { fontWeight: 'bold', fontSize: 24 },
              },
              {
                icon: 'map-marker',
                label: 'Ancaster',
                onPress: () => setSelectedCommunity('Ancaster'),
                labelTextColor: '#103A7B',
                style: { backgroundColor: '#84E3EF' },
                labelStyle: { fontWeight: 'bold', fontSize: 24 },
              },
              {
                icon: 'map-marker',
                label: 'Stoney Creek',
                onPress: () => setSelectedCommunity('Stoney Creek'),
                labelTextColor: '#103A7B',
                style: { backgroundColor: '#84E3EF' },
                labelStyle: { fontWeight: 'bold', fontSize: 24 },
              },
              {
                icon: 'map-marker',
                label: 'Flamborough',
                onPress: () => setSelectedCommunity('Flamborough'),
                labelTextColor: '#103A7B',
                style: { backgroundColor: '#84E3EF' },
                labelStyle: { fontWeight: 'bold', fontSize: 24 },
              },
              {
                icon: 'map-marker',
                label: 'Burlington',
                onPress: () => setSelectedCommunity('Burlington'),
                labelTextColor: '#103A7B',
                style: { backgroundColor: '#84E3EF' },
                labelStyle: { fontWeight: 'bold', fontSize: 24 },
              },
              {
                icon: 'crosshairs-gps',
                label: 'My Location',
                onPress: handleGetCurrentLocation,
                labelTextColor: '#103A7B',
                style: { backgroundColor: '#84E3EF' },
                labelStyle: { fontWeight: 'bold', fontSize: 24 },
              },
            ]}
          />
          {/* Reset App FAB */}
          <FAB
            icon="restart"
            onPress={resetAppState}
            style={{
              position: 'absolute',
              left: 32,
              bottom: 78,
              zIndex: 10,
              backgroundColor: '#2196F3',
              elevation: 6,
            }}
            color="black"
          />
          {/* Search Text Field */}
          <View style={styles.searchBarContainer}>
            <GooglePlacesAutocomplete
              placeholder="Search for a place"
              fetchDetails={true}
              onPress={(data, details = null) => {
                if (details) {
                  const {
                    geometry: {
                      location: { lat, lng },
                    },
                    photos,
                  } = details;

                  const coords = {
                    latitude: lat,
                    longitude: lng,
                  };

                  const photoReference = photos?.[0]?.photo_reference; // Optional Chaining (used for error handeling)
                  if (photoReference) {
                    fetchPhotoUrl(photoReference);
                  } else {
                    setSearchPhotoUrl(null);
                  }

                  setRegion({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  });

                  setSearchMarker(coords);
                  setSearchAddress(data.description);
                }
              }}
              query={{
                key: mapsAPI,
                language: 'en',
              }}
              enablePoweredByContainer={false}
              styles={{
                textInput: {
                  backgroundColor: '#f1fbff',
                  height: 50,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  borderWidth: 2,
                  borderColor: '#2196F3',
                },
                container: {
                  flex: 0,
                },
                listView: {
                  borderRadius: 5,
                  marginTop: 5,
                  elevation: 2,
                },
              }}
            />
          </View>
          {/* Waterfal Markers */}
          <WaterfallMarkers
            community={selectedCommunity}
            setRegion={setRegion}
            setCustomMarkers={setCustomMarkers}
            setSelectedCommunity={setSelectedCommunity}
            deltas={communityDeltas[selectedCommunity]}
          />
          {/* Waterfal Modal */}
          <WaterfallModal
            visible={isModalVisible}
            marker={selectedMarker}
            onClose={() => setModalVisible(false)}
          />
          {/* Campus Modal */}
          <CampusModal
            visible={isCampusModalVisible}
            campus={selectedCampus}
            onClose={() => setCampusModalVisible(false)}
          />
          {/* Current Location Modal */}
          {isLocationModalVisible && location && (
            <Modal
              visible={isLocationModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setLocationModalVisible(false)}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 20,
                    width: '90%',
                    maxHeight: '80%',
                  }}>
                  <ScrollView>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}>
                      You Are Here
                    </Text>

                    <Text style={{ fontSize: 14, marginBottom: 15 }}>
                      This is your current location on the map.
                    </Text>

                    <Text style={{ fontSize: 12, color: '#666' }}>
                      Latitude: {location.latitude.toFixed(5)}
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: '#666', marginBottom: 20 }}>
                      Longitude: {location.longitude.toFixed(5)}
                    </Text>

                    <TouchableOpacity
                      onPress={() => setLocationModalVisible(false)}
                      style={{
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: 'red' }}>Close</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          )}
          {/* Search Modal */}
          {isSearchModalVisible && searchMarker && (
            <Modal
              visible={isSearchModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setSearchModalVisible(false)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 20,
                    width: '90%',
                    maxHeight: '80%',
                  }}>
                  <ScrollView>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}>
                      Search Result
                    </Text>
                    {searchPhotoUrl ? (
                      <Image
                        source={{ uri: searchPhotoUrl }}
                        style={{
                          width: '100%',
                          height: 200,
                          borderRadius: 8,
                          marginBottom: 15,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Text
                        style={{
                          fontStyle: 'italic',
                          color: '#999',
                          marginBottom: 15,
                        }}>
                        No photo available for this location.
                      </Text>
                    )}

                    {searchAddress && (
                      <Text style={{ fontSize: 14, marginBottom: 15 }}>
                        {searchAddress}
                      </Text>
                    )}

                    <Text style={{ fontSize: 12, color: '#666' }}>
                      Latitude: {searchMarker.latitude.toFixed(5)}
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: '#666', marginBottom: 20 }}>
                      Longitude: {searchMarker.longitude.toFixed(5)}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        const url = `https://www.google.com/maps/search/?api=1&query=${searchMarker.latitude},${searchMarker.longitude}`;
                        Linking.openURL(url);
                      }}
                      style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: '#0D8BEF',
                        borderRadius: 6,
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: 'white' }}>
                        Open in Google Maps
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setSearchModalVisible(false)}
                      style={{
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: 'red' }}>Close</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}
