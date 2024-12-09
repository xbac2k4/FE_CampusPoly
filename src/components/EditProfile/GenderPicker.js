import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const GenderPicker = ({ label, selectedGender, onGenderChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

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
      <Text style={[styles.label,{
        color : theme? '#fff' : '#000'
      }]}>{label}</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleModal} style={[styles.picker,{
            backgroundColor : theme? '#000' : '#fff'
        }]}>
          <Text style={[styles.pickerText,{
            color : theme? '#fff' : '#000'
          }]}>
            {selectedGender ? translate(selectedGender) : "Chọn giới tính"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={[styles.modalContent,{
          backgroundColor : theme? Colors.background : '#fff'
        }]}>
          <Text style={[styles.modalTitle,{
            color : theme? '#fff' : '#000'
          }]}>Chọn giới tính</Text>
          <TouchableOpacity onPress={() => handleGenderSelect('male')} style={styles.modalItem}>
            <Text style={[styles.modalItemText,{
              color : theme? '#fff' : '#000'
            }]}>Nam</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelect('female')} style={styles.modalItem}>
            <Text style={[styles.modalItemText,{
              color : theme? '#fff' : '#000'
            }]}>Nữ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelect('other')} style={styles.modalItem}>
            <Text style={[styles.modalItemText,{
              color : theme? '#fff' : '#000'
            }]}>Khác</Text>
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
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  pickerText: {
    fontSize: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 0,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#323436',
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default GenderPicker;
