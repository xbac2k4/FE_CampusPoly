import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width for responsive image sizing

const ProfilePosts = ({ user }) => {
  const [likedPosts, setLikedPosts] = useState([]); // State to keep track of liked posts
  const [savedPosts, setSavedPosts] = useState([]); // State to keep track of saved posts
  const [activeImageIndex, setActiveImageIndex] = useState({}); // State to track the active image index for each post

  if (!user) {
    return null;
  }

  useEffect(() => {
    // Initialize the active image index to 0 for every post with images
    const initialIndices = {};
    user.posts.forEach((post) => {
      if (post.images && post.images.length > 1) {
        initialIndices[post.id] = 0; // Default the first image to be active
      }
    });
    setActiveImageIndex(initialIndices);
  }, [user.posts]);

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId)); // Remove from liked posts if already liked
    } else {
      setLikedPosts([...likedPosts, postId]); // Add to liked posts if not already liked
    }
  };

  const toggleSave = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter((id) => id !== postId)); // Remove from saved posts if already saved
    } else {
      setSavedPosts([...savedPosts, postId]); // Add to saved posts if not already saved
    }
  };

  // Function to render multiple images with pagination dots
  const renderImages = (images, postId) => {
    // Don't show dots if there's only one image
    if (images.length === 1) {
      return (
        <Image source={images[0]} style={styles.postImage} />
      );
    }

    return (
      <>
        <ScrollView
          horizontal
          pagingEnabled
          style={styles.imageList}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            // Update active image index based on scroll position
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setActiveImageIndex((prevState) => ({
              ...prevState,
              [postId]: index,
            }));
          }}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.postImage} />
          ))}
        </ScrollView>
        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeImageIndex[postId] === index
                  ? styles.activeDot
                  : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.flatListContent}>
      {user.posts.map((item) => (
        <View key={item.id} style={styles.postContainer}>
          {/* Post Header with Profile Image and Name */}
          <View style={styles.postHeader}>
            <Image source={user.profileImage} style={styles.profileImage} />
            <View style={styles.headerText}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.postTime}>{item.time}</Text>
            </View>
            <TouchableOpacity style={styles.moreIcon}>
              <Text style={styles.moreText}>⋮</Text>
            </TouchableOpacity>
          </View>

          {/* Post Text */}
          <Text style={styles.postText}>{item.text}</Text>

          {/* Post Images (if available) */}
          {item.images && renderImages(item.images, item.id)}

          {/* Post metadata like likes, comments, etc. */}
          <View style={styles.postMeta}>
            <View style={styles.leftMetaIcons}>
              {/* Like button with color toggle */}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => toggleLike(item.id)}
              >
                <Icon
                  name="thumbs-up"
                  size={20}
                  color={likedPosts.includes(item.id) ? '#FF0000' : '#B3B3B3'} // Change color based on liked state
                />
                <Text style={styles.metaText}>{item.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Icon name="comment" size={20} color="#B3B3B3" />
                <Text style={styles.metaText}>{item.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Icon name="share" size={20} color="#B3B3B3" />
              </TouchableOpacity>
            </View>

            {/* Save Icon with color toggle */}
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => toggleSave(item.id)}
            >
              <Icon
                name={savedPosts.includes(item.id) ? 'bookmark' : 'bookmark-o'} // Change icon based on saved state
                size={20}
                color={savedPosts.includes(item.id) ? '#FF0000' : '#B3B3B3'} // Change color based on saved state
              />
            </TouchableOpacity>
          </View>

          {/* Gray Line Separator */}
          <View style={styles.separator} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  postTime: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  moreIcon: {
    paddingLeft: 10,
  },
  moreText: {
    fontSize: 20,
    color: '#B3B3B3',
  },
  postText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: screenWidth - 50, // Responsive to screen size
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  leftMetaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15, // Adds space between the icons
  },
  metaText: {
    color: '#B3B3B3',
    fontSize: 14,
    marginLeft: 5, // Separates text from the icon
  },
  flatListContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#B3B3B3',
    marginTop: 15,
    marginBottom: 10,
  },
  imageList: {
    marginBottom: 10, // Space below the image gallery
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF0000', // Active red dot
  },
  inactiveDot: {
    backgroundColor: '#B3B3B3', // Inactive gray dot
  },
});

export default ProfilePosts;
