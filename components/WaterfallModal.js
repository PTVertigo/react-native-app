import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';

const WaterfallModal = ({ visible, marker, onClose }) => {
  if (!marker) return null;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${marker.latitude},${marker.longitude}`;
    Linking.openURL(url);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          width: '90%',
          maxHeight: '80%',
        }}>
          <ScrollView>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {marker.title}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'auto' }}>
              {marker.description}
            </Text>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>
              Community: {marker.community}
            </Text>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>
              Access from: {marker.access_from}
            </Text>

            <TouchableOpacity
              onPress={openInGoogleMaps}
              style={{
                marginTop: 15,
                padding: 10,
                backgroundColor: '#0D8BEF',
                borderRadius: 6,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>Get Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              style={{
                marginTop: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'red' }}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default WaterfallModal;
