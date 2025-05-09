import { Modal, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';

const CampusModal = ({ visible, campus, onClose }) => {
  if (!campus) return null;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${campus.lat},${campus.lng}`;
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
              {campus.title}
            </Text>

            <Image
              source={{ uri: campus.img }}
              style={{ width: '100%', height: 180, borderRadius: 8, marginBottom: 10 }}
              resizeMode="cover"
            />

            <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 5 }}>
              {campus.subtitle}
            </Text>

            <Text style={{ fontSize: 14, marginBottom: 15 }}>
              {campus.description}
            </Text>

            <TouchableOpacity
              onPress={openInGoogleMaps}
              style={{
                marginTop: 10,
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

export default CampusModal;
