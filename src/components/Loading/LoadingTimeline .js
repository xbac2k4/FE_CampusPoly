import React from 'react';
import { View, StyleSheet, Image, Text, FlatList } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RenderLoadingTimeline = () => (
    <SkeletonPlaceholder borderRadius={4}>
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <View style={styles.avatar} />
                <View style={{ marginLeft: 10, flexDirection: 'column', width: '100%', gap: 5 }}>
                    <View style={styles.title} />
                    <View style={styles.name} />
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{ height: 10, width: '20%', borderRadius: 10 }} />
                <View style={{ height: 10, width: '20%', borderRadius: 10 }} />
                <View style={{ height: 10, width: '20%', borderRadius: 10 }} />
            </View>
        </View>
    </SkeletonPlaceholder>
);


const LoadingTimeline = props => {
    return (
        <>
            {Array.from({ length: props?.quantity }).map((_, index) => (
                <RenderLoadingTimeline key={index} />
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        height: 250,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    title: {
        width: '30%',
        height: '20%',
        borderRadius: 3,
    },
    name: {
        width: '20%',
        height: '15%',
        borderRadius: 3,
    },
    image: {
        width: '90%',
        height: 150,
        borderRadius: 3,
        backgroundColor: '#F5F5F5',
        marginBottom: 10,
    },
    bottom: {
        width: '100%',
        height: 'auto',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    }
});

export default LoadingTimeline;
