import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';

const ProfileStats = ({ friends, user }) => { // Accept 'user' prop
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{friends.toLocaleString()}</Text>
        <Text style={styles.statText}>Friends</Text>
      </View>

      {/* Pass 'user' data when navigating to EditProfile */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate(Screens.EditProfile, { user })} // Pass user as a parameter
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  stat: {
    alignItems: 'flex-start',
  },
  statNumber: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 14,
    color: '#727477',
  },
  editButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProfileStats;
