import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileScreen from './src/workspaces/ProfileScreen/profileScreen';
import CommentScreen from './src/workspaces/Comment/commentScreen';
import HomeScreen from './src/workspaces/Home/homeScreen';

const App = () => {
  return (
    <View style={{flex:1}}>
      <CommentScreen/>
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
