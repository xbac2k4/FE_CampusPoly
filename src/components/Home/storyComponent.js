import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const StoryComponent = ({ imgStory, imgUser, onStoryPress, onUserPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onStoryPress}>
        <View style={styles.storyContainer}>
          <Image source={imgStory} style={styles.imgStory} />
          <TouchableOpacity onPress={onUserPress} style={styles.imgUserContainer}>
            <LinearGradient
              colors={['#F62E8E', '#AC1AF0']} // Gradient colors for imgUser
              style={styles.userGradient}
            >
              <Image source={imgUser} style={styles.imgUser} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StoryComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginRight: -40,
  },
  storyContainer: {
    position: 'relative', // Use relative position to allow absolute positioning of imgUser
  },
  imgStory: {
    width: 100,
    height: 140,
    borderRadius: 16,
  },
  imgUserContainer: {
    position: 'absolute', // Position imgUser absolutely within the storyContainer
    bottom:  4, // Move imgUser below the imgStory (adjust this value as needed)
    left: '50%', // Center horizontally
    transform: [{ translateX: -16 }], // Adjust position to center imgUser
    width: 32,
    height: 32,
    borderRadius: 20,
    overflow: 'hidden',
  },
  userGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgUser: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth:1,
    borderColor:"#000"
  },
});
