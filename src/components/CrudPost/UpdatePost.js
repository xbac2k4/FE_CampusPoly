import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { UPDATE_POST } from '../../services/ApiConfig'; // Replace with your actual API URL

const UpdatePost = ({ isVisible, onClose, post, onUpdate }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [image, setImage] = useState(post?.image || '');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
    }
  }, [post]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${UPDATE_POST}/${post._id}?user_id=${post.user_id._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          image, // You can add other fields you want to edit
        }),
      });

      const result = await response.json();
      if (response.ok) {
        onUpdate(result.data); // Update the post in the list
        onClose(); // Close the modal
        Alert.alert('Success', 'Post updated successfully!');
      } else {
        Alert.alert('Error', 'Failed to update the post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      Alert.alert('Error', 'An error occurred while updating the post.');
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Edit Post</Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Post Title"
        />

        <TextInput
          value={image}
          onChangeText={setImage}
          style={styles.input}
          placeholder="Post Image URL"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleUpdate} style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default UpdatePost;
