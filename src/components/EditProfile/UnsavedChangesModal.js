import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UnsavedChangesModal = ({ visible, onCancel, onDiscard }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Thay đổi chưa lưu</Text>
        <Text style={styles.text}>Bạn có những thay đổi chưa lưu. Hủy?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>Tiếp tục chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.discardButton]} onPress={onDiscard}>
            <Text style={styles.buttonText}>Bỏ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 350,
    padding: 20,
    backgroundColor: '#181A1C',
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#B7B7B7',
  },
  discardButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default UnsavedChangesModal;
