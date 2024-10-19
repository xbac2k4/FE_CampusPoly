import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import Screens from '../../navigation/Screens';

const WelcomeScreen = ({ navigation }) => {
  const letters = 'CAMPUSPOLY'.split('');
  const animations = useRef(letters.map(() => new Animated.Value(0))).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated.Value cho logo

  useEffect(() => {
    const createAnimation = anim => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      });
    };

    const runAnimation = () => {
      Animated.stagger(
        100,
        animations.map(anim => createAnimation(anim)),
      ).start(() => {
        Animated.sequence([
          Animated.delay(1000),
          Animated.parallel(
            animations.map(anim =>
              Animated.timing(anim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
              }),
            ),
          ),
        ]).start();
      });
    };

    runAnimation();

    // Thêm sự kiện chuyển màn hình sau 3 giây
    const timer = setTimeout(() => {
      navigation.navigate(Screens.MenuAuth); // Thay 'NextScreen' bằng tên màn hình bạn muốn chuyển đến
    }, 2000);

    // Dọn dẹp timer khi component bị unmount
    return () => clearTimeout(timer);
  }, [animations, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CAMPUSPOLY</Text>
      <View style={styles.lettersContainer}>
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.letter,
              {
                opacity: animations[index],
                transform: [
                  {
                    translateY: animations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
      <Animated.Image
        source={require('../../assets/images/logowelcome.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lettersContainer: {
    flexDirection: 'row',
  },
  letter: {
    fontSize: 48,
    color: '#333',
    marginHorizontal: 2,
    fontFamily: 'rubik'
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default WelcomeScreen;
