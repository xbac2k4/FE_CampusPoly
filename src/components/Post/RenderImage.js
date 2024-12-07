import React, { useRef } from 'react'
import { Animated, Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import { PageIndicator } from 'react-native-page-indicator'

const RenderImage = ({ images }) => {

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
                    <View key={index} style={[{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, { width, height: height * 0.3 }]}>
                        <Image source={{ uri: page }} width={width * 0.9} height={height * 0.3} style={{
                            borderRadius: 10
                        }} />
                    </View>
                ))}
            </Animated.ScrollView>

            {/* nếu có nhiều hơn 1 hình ảnh thì hiển thị PageIndicator */}
            {
                images.length > 1 && (
                    <View style={{
                        left: 20,
                        right: 20,
                        bottom: 35,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <PageIndicator count={images.length} current={animatedCurrent} color='white' />
                    </View>
                )
            }

        </>
    )
}

export default RenderImage

const styles = StyleSheet.create({})