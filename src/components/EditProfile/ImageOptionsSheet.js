import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const ImageOptionsSheet = React.forwardRef(({ onUpload }, ref) => {
  const { theme } = useContext(ThemeContext);
  return (
    <RBSheet
      ref={ref}
      height={100} // Adjusted height since delete option is removed
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
        container: {
          backgroundColor: theme ? '#181A1C' : '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        },
      }}
    >
      <TouchableOpacity style={styles.bottomSheetButton} onPress={onUpload}>
        <Text style={[styles.bottomSheetButtonText, {
          color: theme ? '#fff' : Colors.background,
        }]}>Tải ảnh lên</Text>
      </TouchableOpacity>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bottomSheetButtonText: {
    fontSize: 16,
  },
});

export default ImageOptionsSheet;
