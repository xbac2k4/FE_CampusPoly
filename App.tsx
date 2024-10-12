// src/App.tsx
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
