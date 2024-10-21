import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';

const user = {
  name: 'John Doe',
  profileImage: require('../../assets/images/avt.png'),
  posts: [
    {
      id: '1',
      text: 'Beautiful day for a walk in the park!',
      time: '2h ago',
      likes: 120,
      comments: 30,
      images: [require('../../assets/images/dongthoigian.png')],
    },
    {
      id: '2',
      text: 'Enjoying the sunset by the beach.',
      time: '5h ago',
      likes: 320,
      comments: 60,
      images: [require('../../assets/images/dongthoigian2.png')],
    },
  ],
};

const SearchScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="#FFFFFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search for people, posts, tags..."
            placeholderTextColor="#ECEBED"
          />
        </View>
        <Text style={styles.popularText}>Popular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {['All', 'Profiles', 'Photos', 'Videos', 'Text', 'Links'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeButton,
              ]}
              onPress={() => handleFilterPress(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Thay FlatList bằng ProfilePosts */}
        <ProfilePosts user={user} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A1C',
    paddingTop: 20,
  },
  searchContainer: {
    top: 24,
    flexDirection: 'row-reverse',
    backgroundColor: '#323436',
    borderRadius: 32,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 44,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#ECEBED',
  },
  popularText: {
    marginTop : 20,
    marginHorizontal : 15,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginBottom: 32,
    paddingVertical: 15
  },
  filterButton: {
    backgroundColor: '#323436',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    color: '#ECEBED',
    fontSize: 14,
  },
  activeButton: {
    backgroundColor: '#0066FF',
  },
});
