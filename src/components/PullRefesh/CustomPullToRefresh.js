import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

const CustomPullToRefresh = ({ children, onRefresh }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onScroll = (event) => {
    const distance = event.nativeEvent.contentOffset.y * -1;
    // Cập nhật khoảng cách kéo, nhưng không cho phép kéo hơn 150px
    if (distance > 150) {
      setPullDistance(150); // Giới hạn kéo tối đa
    } else {
      setPullDistance(distance);
    }
  };

  const handleRefresh = async () => {
    if (pullDistance > 100 && !refreshing) {
      setRefreshing(true);
      await onRefresh();
      setPullDistance(0); // Reset khoảng cách kéo sau khi refresh
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      onScroll={onScroll}
      scrollEventThrottle={16}
      onScrollEndDrag={handleRefresh}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false} // Tắt thanh cuộn nếu không cần thiết
    >
      {/* Hiển thị phần kéo để refresh chỉ khi pullDistance lớn hơn 50 */}
      {pullDistance > 50 && (
        <View style={styles.pullContainer}>
          <Text style={styles.pullText}>
            {pullDistance > 100 ? 'Loading...' : 'Pull down to refresh'}
          </Text>
          {pullDistance > 100 && (
            <LottieView
              source={require('../../assets/lottie/loading.json')}
              style={styles.lottie}
              autoPlay={true}
              loop={true}
            />
          )}
        </View>
      )}
      {children}
    </ScrollView>
  );
};

CustomPullToRefresh.propTypes = {
  children: PropTypes.node.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  pullContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#181A1C', // Đặt màu nền để dễ nhìn thấy
  },
  pullText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default CustomPullToRefresh;
