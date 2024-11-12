import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const GenderPicker = ({ label, selectedGender, onGenderChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleGenderSelect = (gender) => {
    onGenderChange(gender);
    toggleModal();
  };

  const translate = (sex) => {
    if (sex == 'female') {
      return 'Nữ'
    }

    if (sex == 'male') {
      return 'Nam'
    }

    if (sex == 'other') {
      return 'Khác'
    }
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleModal} style={styles.picker}>
          <Text style={styles.pickerText}>
            {selectedGender ? translate(selectedGender) : "Chọn giới tính"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chọn giới tính</Text>
          <TouchableOpacity onPress={() => handleGenderSelect('male')} style={styles.modalItem}>
            <Text style={styles.modalItemText}>Nam</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelect('female')} style={styles.modalItem}>
            <Text style={styles.modalItemText}>Nữ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelect('other')} style={styles.modalItem}>
            <Text style={styles.modalItemText}>Khác</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#323436',
    borderRadius: 8,
    overflow: 'hidden',
  },
  label: {
    color: '#ffff',
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#000000',
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  pickerText: {
    color: '#fff',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#181A1C',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#323436',
  },
  modalItemText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GenderPicker;
