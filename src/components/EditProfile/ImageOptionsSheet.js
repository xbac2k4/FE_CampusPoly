import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const ImageOptionsSheet = React.forwardRef(({ onUpload, onDelete, canDelete }, ref) => {
  return (
    <RBSheet
      ref={ref}
      height={160}
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

      <View style={styles.separator} />

      <TouchableOpacity
        style={[styles.bottomSheetButton, !canDelete && styles.disabledButton]} 
        onPress={canDelete ? onDelete : null} 
        disabled={!canDelete} 
      >
        <Text style={styles.bottomSheetDeleteButton}>Xóa ảnh</Text>
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
  bottomSheetDeleteButton: {
    fontSize: 16,
    color: '#F5535B',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5, 
  },
  separator: {
    height: 1,
    backgroundColor: '#2A2D30',
    marginVertical: 10,
  },
});

export default ImageOptionsSheet;
