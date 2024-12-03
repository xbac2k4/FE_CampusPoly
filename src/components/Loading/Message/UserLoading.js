import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonShimmer from '../SkeletonShimmer';

const UserLoading = () => {
    return (
        <View style={{
            width: '100%',
            padding: 10,
        }}>
            {Array.from({ length: 4 }).map((_, index) => (
                <UserItem key={index} />
            ))}
        </View>
    );
}

const UserItem = () => {
    return (
        <View style={{
            width: '100%',
            marginLeft: 20,
            marginTop: 20,
            // backgroundColor: 'white',
            flexDirection: 'row',
        }}>
            <SkeletonShimmer width={50} height={50} borderRadius={50} />
            <View style={{
                marginLeft: 10,
            }}>
                <SkeletonShimmer width={100} height={20} borderRadius={10} />
                <SkeletonShimmer width={150} height={20} borderRadius={10} style={{ marginTop: 10 }} />
            </View>

        </View>
    );
}

export default UserLoading

const styles = StyleSheet.create({})