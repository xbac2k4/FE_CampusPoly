import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonShimmer from './SkeletonShimmer';

const RenderLoadingTimeline = () => (
    <View style={styles.container}>
        <View style={{
            flexDirection: 'row',
            width: '100%',
        }}>
            <SkeletonShimmer width={50} height={50} borderRadius={50} />
            <View style={{
                marginLeft: 10,
            }}>
                <SkeletonShimmer width={100} height={20} borderRadius={10} style={{marginBottom:10}}/>
                <SkeletonShimmer width={80} height={15} borderRadius={10} />
            </View>
        </View>

        <View style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <SkeletonShimmer width={100} height={20} borderRadius={10}/>
            <SkeletonShimmer width={100} height={20} borderRadius={10}/>
        </View>
    </View>

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
    }
});

export default LoadingTimeline;
