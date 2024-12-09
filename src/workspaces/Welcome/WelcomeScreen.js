import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image, StatusBar } from 'react-native';
import Screens from '../../navigation/Screens';
import Colors from '../../constants/Color';
import { CommonActions } from '@react-navigation/native';
import { ThemeContext } from '../../services/provider/ThemeContext';

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
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
        ]).start(() => {
          runAnimation();
        });
      });
    };

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    runAnimation();

    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Screens.MenuAuth }],
        })
      );
    }, 2000);

    // Dọn dẹp timer khi component bị unmount
    return () => clearTimeout(timer);
  }, [animations, navigation]);

  const renderLetters = () => {
    return letters.map((letter, index) => {
      const translateY = animations[index].interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
      });

      const rotate = animations[index].interpolate({
        inputRange: [0, 1],
        outputRange: ['30deg', '0deg'],
      });

      const opacity = animations[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });

      return (
        <Animated.Text
          key={index}
          style={[
            st.letter,
            {
              transform: [{ translateY }, { rotate }],
              opacity: opacity,
              color: theme ? '#fff' : Colors.background,
            },
          ]}>
          {letter}
        </Animated.Text>
      );
    });
  };

  return (
    <View style={[st.container, {
      backgroundColor: theme ? Colors.background : '#fff',
    }]}>
      {/* Logo với hiệu ứng fade-in */}
      <StatusBar translucent backgroundColor="transparent" barStyle={theme ? 'light-content' : 'dark-content'} />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={
            theme ? require('../../assets/images/white_bee.png')
              : require('../../assets/images/black_bee.png')}
          style={st.logo}
        />
      </Animated.View>

      <View style={st.textContainer}>{renderLetters()}</View>
      <Text style={[st.sinceText, {
        color: theme ? '#fff' : Colors.background,
      }]}>SINCE 2024</Text>
    </View>
  );
};

export default WelcomeScreen;

const st = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  textContainer: {
    position: 'absolute',
    top: '60%',
    zIndex: 1,
    flexDirection: 'row',
  },
  letter: {
    fontSize: 40,
    marginHorizontal: 2,
    fontFamily: 'rubik',
  },
  sinceText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'rubik',
    marginTop: 50,
  },
});