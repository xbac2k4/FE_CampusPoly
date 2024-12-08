import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import { GET_SEARCH_POST_BY_HASHTAG } from '../../services/ApiConfig';
import Screens from '../../navigation/Screens';
import { ThemeContext } from '../../services/provider/ThemeContext';
import { useContext } from 'react';
import Colors from '../../constants/Color';

const SearchComponents = ({ filteredHashtags, filteredUsers }) => {
    const navigation = useNavigation();
    const [isHashtagSelected, setIsHashtagSelected] = useState(false);
    const [posts, setPosts] = useState([]); // Dữ liệu bài viết khi hashtag được chọn
    const { theme } = useContext(ThemeContext);


    // Hàm xử lý khi bấm vào avatar hoặc tên người dùng
    const handleProfileClick = (userId) => {
        navigation.navigate(Screens.Profile, { id: userId });
    };
    // const removeVietnameseTones = (str) => {
    //     return str
    //         .normalize("NFD")
    //         .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    //         .replace(/đ/g, "d")
    //         .replace(/Đ/g, "D")
    //         .toLowerCase();
    // };
    // const handleSearch = (text, data) => {
    //     const normalizedText = removeVietnameseTones(text);
    //     setSearchQuery(normalizedText);

    //     if (normalizedText === "") {
    //         setFilteredHashTags(data.hashtags);
    //     } else {
    //         const filteredHashTags = data.hashtags.filter((hashtag) => {
    //             const normalizedHashtag = removeVietnameseTones(hashtag?.hashtag_name || "");
    //             return normalizedHashtag.includes(normalizedText);
    //         });

    //         setFilteredHashTags(filteredHashTags);
    //     }
    // };

    const handleHashtagClick = async (hashtag) => {
        // console.log('Hashtag selected:', hashtag);
        setIsHashtagSelected(true);


        // Gọi API lấy bài viết theo hashtag
        try {
            const response = await fetch(`${GET_SEARCH_POST_BY_HASHTAG}${encodeURIComponent(hashtag)}`);
            const responseData = await response.json();
            // Kiểm tra cấu trúc dữ liệu trả về
            // console.log('API Response:', responseData);
            // Kiểm tra xem dữ liệu có chứa posts hay không và posts có phải là mảng không
            if (responseData.status === 200) {
                // Cập nhật danh sách bài viết
                setPosts(responseData.data);

            } else {
                console.error("Dữ liệu trả về không đúng cấu trúc", responseData);
                setPosts([]); // Xóa dữ liệu nếu không hợp lệ
            }
        } catch (error) {
            console.error("Lỗi khi tải bài viết:", error);
            setPosts([]); // Xóa dữ liệu bài viết nếu có lỗi
        }
    };


    // Thành phần cho mỗi hashtag
    const renderHashtagItem = ({ item }) => (
        <TouchableOpacity style={[styles.hashtagContainer, {
            backgroundColor: theme ? '#323436' : '#fff',
            elevation: theme ? 0 : 5,
        }]} onPress={() => handleHashtagClick(item?.hashtag_name)}>
            <Text style={[styles.hashtagText, {
                color: theme ? '#FFFFFF' : Colors.background
            }]}>{item?.hashtag_name || 'Hashtag'}</Text>
        </TouchableOpacity>
    );

    // Thành phần cho mỗi người dùng
    const renderUserItem = ({ item }) => (
        <TouchableOpacity style={[styles.userContainer, {
            backgroundColor: theme ? '#323436' : '#fff',
            elevation: theme ? 0 : 5,
        }]}
            onPress={() => handleProfileClick(item?._id)}
        >
            <Image
                source={{
                    uri: item?.avatar?.replace('localhost', '10.0.2.2') ||
                        'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg',
                }}
                style={styles.profileImage}
            />
            <Text style={[styles.userName,{
                color: theme ? '#FFFFFF' : Colors.background
            }]}>{item?.full_name || 'Vô danh'}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, {
            backgroundColor: theme ? Colors.background : '#f3f4f8'
        }]}>
            {
                filteredHashtags.length > 0 && (
                    <FlatList
                        showsHorizontalScrollIndicator={true}
                        data={filteredHashtags}
                        horizontal={true}
                        renderItem={renderHashtagItem}
                        keyExtractor={(item) => item?._id ? item._id.toString() : item.id.toString()}
                        style={styles.hashtagList}
                        ListEmptyComponent={<Text style={styles.noResultsText}></Text>}
                    />
                )
            }


            {/* FlatList cho Users (dọc) */}
            <View style={{ flex: 1, paddingBottom: 35 }}>
                {!isHashtagSelected ? (
                    <FlatList
                        data={filteredUsers}
                        renderItem={renderUserItem}
                        keyExtractor={(item) => item?._id ? item._id.toString() : item.id.toString()}
                        style={styles.userList}
                    // ListEmptyComponent={<Text style={styles.noResultsText}>Gợi ý</Text>}
                    />
                ) : (
                    posts ? (
                        <ProfilePosts data={posts} />
                    ) : null
                )}
            </View>


        </View>
    );
};

export default SearchComponents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hashtagList: {
        marginBottom: 5,
        flexGrow: 0,
        marginHorizontal: 20
    },
    hashtagContainer: {
        borderRadius: 5,
        maxHeight: 35,
        marginRight: 10,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },
    hashtagText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userList: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        marginBottom: 15,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noResultsText: {
        color: '#FFFFFF',
        fontSize: 14,
        alignContent: 'center',
        marginTop: 6,
    },
});
