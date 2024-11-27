import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonShimmer from '../SkeletonShimmer';

const FriendLoading = () => {
    return (
        <View style={{
            flexDirection: 'row',
            width: '100%',
            paddingVertical: 10,
        }}>
            {Array.from({ length: 4 }).map((_, index) => (
                <FriendItem key={index} />
            ))}
        </View>
    );
}

const FriendItem = () => {
    return (
        <View style={styles.container}>
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 20
            }}>
                <SkeletonShimmer width={50} height={50} borderRadius={50} />
                <SkeletonShimmer width={50} height={20} borderRadius={10} style={{ marginTop: 10 }} />

            </View>
        </View>
    );
}

export default FriendLoading

const styles = StyleSheet.create({})