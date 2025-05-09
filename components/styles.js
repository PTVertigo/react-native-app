import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
  },
  searchBarContainer: {
    position: 'absolute',
    borderRadius: 20,
    top: 60,
    left: 16,
    right: 16,
    zIndex: 10,
  },

  searchBar: {
    borderRadius: 25,
    backgroundColor: 'white',
    elevation: 4,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 30,
    zIndex: 10,
  },
});
