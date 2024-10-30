import React, { useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import GiphySelector from './GiphySelector';

const GiphyBottomSheet = ({ isVisible, onGifSelect, closeSheet }) => {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ['25%', '50%'];

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    closeSheet();
  }, [closeSheet]);

  // Khi BottomSheet xuất hiện, nó sẽ được mở
  React.useEffect(() => {
    if (isVisible) handleOpen();
  }, [isVisible, handleOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onDismiss={handleClose}>
      <View style={styles.container}>
        <GiphySelector onGifSelect={onGifSelect} />
      </View>
    </BottomSheetModal>
  );
};

export default GiphyBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
