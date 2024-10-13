import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileScreen from './src/workspaces/ProfileScreen/profileScreen';

const App = () => {
  return (
    <View style={styles.screen}>
      <ProfileScreen />
    </View>
  );
};

export default App
  
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
