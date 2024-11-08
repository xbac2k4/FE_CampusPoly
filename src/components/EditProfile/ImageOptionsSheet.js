import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const ImageOptionsSheet = React.forwardRef(({ onUpload }, ref) => {
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
          backgroundColor: '#181A1C',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        },
      }}
    >
      <TouchableOpacity style={styles.bottomSheetButton} onPress={onUpload}>
        <Text style={styles.bottomSheetButtonText}>Tải ảnh lên</Text>
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
    color: '#fff', 
  },
});

export default ImageOptionsSheet;
