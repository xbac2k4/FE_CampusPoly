import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/workspaces/Home/homeScreen'
import CommentScreen from './src/workspaces/Comment/commentScreen'

const App = () => {
  return (
    <View style={{flex:1}}>
      <HomeScreen/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})