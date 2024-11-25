import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Share from 'react-native-share';

// Icon share
import shareIcon from '../../assets/images/share.png';

const ShareComponent = ({ post }) => {
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Chia sẻ bài viết',
        message: `Hãy xem bài viết này: ${post.title}\n\nLink: ${post.url || ''}`,
        url: post.image || null, // URL ảnh nếu có
        // Thêm lựa chọn chia sẻ đến các ứng dụng cụ thể
        social: Share.Social.EMAIL, // Mặc định chia sẻ qua email nếu không chọn ứng dụng nào
        // Để chỉ định ứng dụng cụ thể, bạn có thể chỉ định các phương thức chia sẻ.
      };

      // Chia sẻ đến Facebook
      const facebookShare = { ...shareOptions, social: Share.Social.FACEBOOK };
      await Share.open(facebookShare);

      // Chia sẻ đến Zalo
      const zaloShare = { ...shareOptions, social: Share.Social.ZALO };
      await Share.open(zaloShare);
    } catch (error) {
      if (error && error.message) {
        console.log('Share error:', error.message);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
      <Image source={shareIcon} style={styles.shareIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    marginHorizontal: 10,
  },
  shareIcon: {
    width: 24,
    height: 24,
  },
});

export default ShareComponent;
