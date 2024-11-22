import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';

const NotificationModal = ({ visible, onConfirm, onCancel, success }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image 
            source={success ? require('../../assets/images/success.png') : require('../../assets/images/report.png')} 
            style={styles.icon} 
          />
          <Text style={styles.title}>
            {success ? 'Thành công!' : 'Thông báo!'}
          </Text>
          <Text style={styles.message}>
            {success ? 'Báo cáo đã được gửi thành công.' : 'Bạn có chắc với lựa chọn này?'}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.confirmButton, success && styles.successButton]} 
              onPress={onConfirm}>
              <Text style={styles.confirmText}>
                {success ? 'OK' : 'Đồng ý'}
              </Text>
            </TouchableOpacity>
            {!success && (
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
            )}
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
    backgroundColor: 'white',
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
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  confirmButton: {
    backgroundColor: '#6a1b9a',
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
    color: '#333',
    fontSize: 16,
  },
});

export default NotificationModal;
