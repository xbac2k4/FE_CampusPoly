import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import comment from '../../assets/images/comment.png';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
import heart from '../../assets/images/heart.png';
import heartFilled from '../../assets/images/hear2.png';

const SearchComponents = ({ post }) => {
    const [likedPosts, setLikedPosts] = useState([]);
    if (!post) return null;

    // console.log('Dữ liệu bài viết:', post); // Debug dữ liệu bài viết
    const toggleLike = (postId) => {
        setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.includes(postId)
                ? prevLikedPosts.filter((id) => id !== postId)
                : [...prevLikedPosts, postId]
        );
    };

    // Đảm bảo rằng trường name tồn tại trong post.user_id hoặc post.author
    const userName = post.user_id?.full_name || post.author?.name || 'Vô danh';

    const navigation = useNavigation(); // Hook to access navigation
    // Xử lý khi bấm vào avatar và tên người dùng
    const handleProfileClick = () => {
        navigation.navigate(Screens.Profile, { id: post.user_id._id });
        // navigation.navigate(Screens.Profile, { userId: post.user_id?._id || post.author?._id });
    };
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <TouchableOpacity onPress={() => handleProfileClick()}>
                    <Image
                        source={{
                            uri: post.user_id?.avatar.replace('localhost', '10.0.2.2') ||
                                'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg',
                        }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={() => handleProfileClick()}>
                        <Text style={styles.postName}>{userName}</Text>
                    </TouchableOpacity>
                    <Text style={styles.postTime}>
                        {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Thời gian không xác định'}
                    </Text>
                </View>
            </View>
            {post.images && post.images.length > 0 && (
                <Image source={{ uri: post.images[0] }} style={styles.postImage} />
            )}
            <Text
                style={styles.postTitle}
                numberOfLines={1} // Giới hạn hiển thị 1 dòng
                ellipsizeMode="tail" // Dấu ... xuất hiện ở cuối dòng
            >
                {post.title || 'Không có tiêu đề'}
            </Text>
            <Text
                style={styles.postContent}
                numberOfLines={2} // Giới hạn hiển thị 2 dòng
                ellipsizeMode="tail" // Dấu ... xuất hiện ở cuối dòng
            >
                {post.content || 'Nội dung không có sẵn'}
            </Text>
            <View style={styles.postStats}>
                <View style={styles.iconLike}>
                    <TouchableOpacity onPress={() => toggleLike( post._id )}>
                        <Image
                            source={likedPosts.includes( post._id ) ? heartFilled : heart}
                            style={styles.iconImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.metaText}>{post.like_count}</Text>
                </View>

                <View style={styles.iconLike}>
                    <TouchableOpacity onPress={() => navigation.navigate(Screens.Comment, { postId: post._id })}>
                        <Image source={comment} style={styles.iconImage} />
                    </TouchableOpacity>
                    <Text style={styles.metaText}>{post.comments || 0}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        marginBottom: 20,
        backgroundColor: '#323436',
        borderRadius: 8,
        padding: 10,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    postName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTime: {
        color: '#888888',
        fontSize: 12,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    postTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    postContent: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: 8,
    },
    postStats: {
        flexDirection: 'row',
        alignItems: 'center',  // Căn chỉnh theo chiều ngang
        justifyContent: 'flex-start',  // Canh đều các phần tử
        marginBottom: 8,
    },
    iconLike: {
        flexDirection: 'row',  // Các phần tử icon và số lượng sẽ nằm trên cùng 1 hàng
        alignItems: 'center',  // Căn chỉnh theo chiều dọc
        marginRight: 20,  // Khoảng cách giữa các biểu tượng
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    metaText: {
        color: '#B3B3B3',
        fontSize: 14,
        marginLeft: 5,  // Khoảng cách giữa icon và số lượng
    },
});

export default SearchComponents;
