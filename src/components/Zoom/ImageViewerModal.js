import React from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageViewerModal = ({ visible, images, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <ImageViewer imageUrls={images} enableSwipeDown={true} onSwipeDown={onClose} />
    </Modal>
  );
};

export default ImageViewerModal;
