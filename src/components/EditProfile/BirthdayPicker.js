import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const BirthdayPicker = ({ label, selectedDate, onDateChange }) => {

  const [isShowDate, setIsShowDate] = useState(false)

  const handleConfirmDate = (date) => {
    setIsShowDate(false)
    onDateChange(date)
    // console.log(date);
  }

  const togggleDatePicker = () => {
    setIsShowDate(!isShowDate)
  }
  const { theme } = useContext(ThemeContext);

  const formatDate = (date) => {
    let day = date?.getDate();
    let month = date?.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = date?.getFullYear();

    // Thêm số 0 vào trước ngày và tháng nếu cần
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}/${month}/${year}`;
  };

  return (
    <View>
      <Text style={[styles.label,{
        color : theme? '#fff' : '#000'
      }]}>{label}</Text>
      <TouchableOpacity onPress={togggleDatePicker} style={[styles.dateButton,{
         backgroundColor : theme? '#000' : '#fff'
      }]}>
        <Text style={[styles.dateText,{
          color : theme? '#fff' : '#000'
        }]}>{!selectedDate ? 'Chưa cập nhật' : formatDate(selectedDate)}</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        title={'Chọn ngày sinh'}
        open={isShowDate}
        date={selectedDate || new Date()}
        mode='date'
        theme={theme? 'dark' : 'light'}
        onConfirm={handleConfirmDate}
        onCancel={togggleDatePicker}
        locale='vi'
        confirmText='Xác nhận'
        cancelText='Hủy'
        maximumDate={new Date()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#323436',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateText: {
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
