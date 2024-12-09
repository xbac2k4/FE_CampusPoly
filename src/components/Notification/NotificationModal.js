import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const NotificationModal = ({ visible, message, onConfirm, onCancel }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {
          backgroundColor: theme ? Colors.background : Colors.light,
        }]}>
          <Image source={require('../../assets/images/report.png')} style={styles.icon} />
          <Text style={styles.title}>Thông báo!</Text>
          <Text style={[styles.message, {
            color: theme ? '#fff' : Colors.background,
          }]}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Đồng ý</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={[styles.cancelText, {
                color: theme ? '#fff' : Colors.background,
              }]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  confirmButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  successButton: {
    backgroundColor: '#4caf50', // Màu xanh lá khi thành công
  },
  confirmText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelText: {
    fontSize: 16,
  },
});

export default NotificationModal;
