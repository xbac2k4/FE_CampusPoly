import { useNavigation } from '@react-navigation/native';
import React, { useContext, useRef } from 'react';
import { Animated, Image, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { PageIndicator } from 'react-native-page-indicator';
import Screens from '../../navigation/Screens';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const RenderImage = ({ images, subStyle }) => {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const { width, height } = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
    return (
        <>
            <Animated.ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: true,
                })}
            >
                {images.map((page, index) => (
                    <TouchableOpacity key={index}
                        onPress={() => navigation.navigate(Screens.DetailImage, {
                            image: page,
                        })}
                        style={[{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, { width, height: height * 0.3 }]}>
                        <Image source={{ uri: page }} width={width * 1} height={height * 0.3} style={{
                            borderRadius: 10,
                            resizeMode: 'contain',
                        }} />
                    </TouchableOpacity>
                ))}
            </Animated.ScrollView>

            {/* nếu có nhiều hơn 1 hình ảnh thì hiển thị PageIndicator */}
            {
                images.length > 1 && (
                    <View style={[{
                        left: 20,
                        right: 20,
                        bottom: 40,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, subStyle]}>
                        <PageIndicator activeColor={Colors.second} count={images.length} current={animatedCurrent} color={theme ? '#fff' : '#ccc'} />
                    </View>
                )
            }

        </>
    )
}

export default RenderImage