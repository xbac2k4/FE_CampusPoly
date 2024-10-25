import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import ArticleComponent from '../../components/Home/articleComponent';
import CommentComponent from '../../components/Comment/CommentComponent';
import CommentInputComponent from '../../components/Comment/CommentInputComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';

const CommentScreen = () => {
  const route = useRoute();
const { postId } = route.params; // Nhận postId từ navigation params

  const navigation = useNavigation(); // Khởi tạo navigation
  useEffect(() => {
    console.log('Received postId:', postId); // In ra postId để kiểm tra
  }, [postId]);


  const handleSendComment = comment => {
    console.log('Comment gửi:', comment);
    // Xử lý khi gửi comment (thêm vào danh sách, đẩy lên server, v.v.)
  };
 

  const fakeComments = [
    {
      id: '1',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'Nguyễn Minh',
      content: 'Bài viết rất thú vị!',
      time: '2m',
      likes: 10,
    },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.barHeader}>
          <TouchableOpacity
           onPress={() => navigation.goBack()} // Sử dụng navigation.goBack()
            style={styles.circleIcon}>
            <Image
              source={require('../../assets/images/arowleft.png')}
              resizeMode="contain"
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>POST</Text>
          <Text style={[styles.textHeader, { color: '#181A1C' }]}>Post</Text>
        </View>

        {/* Hiển thị bài viết từ params */}
        <ProfilePosts  postId={postId}/>

        {/* Header cho phần Comment */}
        <View style={styles.barComment}>
          <Text style={styles.commentTitle}>
            COMMENTS (<Text>{fakeComments.length}</Text>)
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.recentText}>Recent</Text>
            <TouchableOpacity onPress={() => {
              // Xử lý hành động khi click vào Recent
            }}>
              <Image
                source={require("../../assets/images/arrowbottom.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hiển thị danh sách bình luận */}
        <View style={{paddingHorizontal:24}}>
        {fakeComments.map(comment => (
          <CommentComponent
            key={comment.id}
            avatar={comment.avatar}
            name={comment.name}
            content={comment.content}
            time={comment.time}
            likes={comment.likes}
          />
        ))}
        </View>
       
      </ScrollView>

      {/* Input để gửi comment */}
      <CommentInputComponent onSend={handleSendComment} />
    </>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A1C',
  },
  barHeader: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal:24
  },
  circleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#323436',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    color: '#ECEBED',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'rgl1',
  },
  barComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    paddingHorizontal:24
  },
  commentTitle: {
    fontFamily: 'rgl1',
    fontSize: 14,
    fontWeight: 'regular',
    color: '#ECEBED',
    
  },
  recentText: {
    fontFamily: 'rgl1',
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#ECEBED',
    marginRight: 3,
  },
});
