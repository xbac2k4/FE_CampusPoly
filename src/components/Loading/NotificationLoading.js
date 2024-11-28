import React from 'react';
import { View } from 'react-native';
import SkeletonShimmer from './SkeletonShimmer';

const NotificationLoading = () => {
    return (
        <View style={{
            width: '100%',
            padding: 10,
        }}>
            {Array.from({ length: 4 }).map((_, index) => (
                <>
                    <NotificationItem key={index} />
                    <View style={{
                        height: 1,
                        backgroundColor: '#3A3A3C',
                        width: '100%',
                    }} />
                </>
            ))}
        </View>
    );
}

const NotificationItem = () => {
    return (
        <View style={{
            width: '100%',
            marginLeft: 20,
            marginVertical: 20,
            flexDirection: 'row',
        }}>
            <SkeletonShimmer width={50} height={50} borderRadius={50} />
            <View style={{
                marginLeft: 10,
            }}>
                <SkeletonShimmer width={100} height={12} borderRadius={10} />
                <SkeletonShimmer width={150} height={11} borderRadius={10} style={{ marginTop: 10 }} />
                <SkeletonShimmer width={80} height={10} borderRadius={10} style={{ marginTop: 10 }} />
            </View>

        </View>
    );
}

export default NotificationLoading