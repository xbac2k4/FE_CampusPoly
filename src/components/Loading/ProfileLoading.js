import { StyleSheet, View } from "react-native"
import SkeletonShimmer from "./SkeletonShimmer";

export const ProfileLoading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <SkeletonShimmer width={150} height={150} borderRadius={100} style={styles.avatar} />
            </View>
            <View style={styles.name}>
                <SkeletonShimmer width={200} height={35} borderRadius={10} style={{ marginRight: 10 }} />
                <SkeletonShimmer width={35} height={35} borderRadius={50} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        backgroundColor: 'gray',
        height: '20%',
        width: "100%",
        alignItems: 'center',
    },
    avatar: {
        position: 'absolute',
        bottom: -75,
    },
    name: {
        flexDirection: "row",
        marginTop: 90,
    }

});