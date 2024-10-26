import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, PanResponder } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BirthdayPicker = ({ onDateChange }) => {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('Select Birthday');

  const openPicker = () => setShowPicker(true);
  const closePicker = () => setShowPicker(false);

  const confirmDate = () => {
    const selectedDate = new Date(year, month - 1, day);
    onDateChange(selectedDate);
    setFormattedDate(formatDate(selectedDate));
    closePicker();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 10;
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        closePicker();
      }
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={openPicker} style={styles.dateButton}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={closePicker}
      >
        <TouchableWithoutFeedback onPress={closePicker}>
          <View style={styles.modalContainer}>
            <View
              style={styles.pickerContainer}
              {...panResponder.panHandlers}
            >
              <Text style={styles.modalTitle}>Select Date of Birth</Text>

              <View style={styles.pickerRow}>
                <Picker
                  selectedValue={day}
                  style={styles.picker}
                  onValueChange={(itemValue) => setDay(itemValue)}
                >
                  {[...Array(31)].map((_, i) => (
                    <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
                  ))}
                </Picker>

                <Picker
                  selectedValue={month}
                  style={styles.picker}
                  onValueChange={(itemValue) => setMonth(itemValue)}
                >
                  {[...Array(12)].map((_, i) => (
                    <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
                  ))}
                </Picker>

                <Picker
                  selectedValue={year}
                  style={styles.picker}
                  onValueChange={(itemValue) => setYear(itemValue)}
                >
                  {[...Array(100)].map((_, i) => (
                    <Picker.Item key={i} label={`${new Date().getFullYear() - i}`} value={new Date().getFullYear() - i} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity onPress={confirmDate} style={styles.confirmButton}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    padding: 15,
    backgroundColor: '#000000',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#323436',
    alignItems: 'flex-start',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#323436',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 150,
    color: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default BirthdayPicker;
