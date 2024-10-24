import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ArticleComponent from '../../components/Home/articleComponent';
import CommentComponent from '../../components/Comment/CommentComponent';
import CommentInputComponent from '../../components/Comment/CommentInputComponent';

const CommentScreen = ({ navigation }) => {

  const handleSendComment = comment => {
    console.log('Comment gửi:', comment);
    // Xử lý khi gửi comment (thêm vào danh sách, đẩy lên server, v.v.)
  };
  const fakeArticles = [
    {
      id: '1',
      imgavatar: require('../../assets/images/car1.jpg'),
      username: 'Đào Việt Anh',
      time: '2h ago',
      content: 'This is the first article content.',
      imgcontent: require('../../assets/images/car2.jpg'),
      likecount: 150,
      commentcount: 20,
    },
  ];

  const fakeComments = [
    {
      id: '1',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'Nguyễn Minh',
      content: 'Bài viết rất thú vị!',
      time: '2m',
      likes: 10,
    },
    {
      id: '2',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      name: 'Trần Huyền',
      content: 'Đồng ý với bài viết này!',
      time: '5m',
      likes: 12,
    },
    {
      id: '3',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      name: 'Lê Anh Tuấn',
      content: 'Thông tin rất hữu ích.',
      time: '10m',
      likes: 20,
    },
    {
      id: '4',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      name: 'Phạm Thanh',
      content: 'Rất hay, cảm ơn bạn.',
      time: '15m',
      likes: 8,
    },
    {
      id: '5',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      name: 'Linh Chi',
      content: 'Mong có thêm bài viết mới.',
      time: '30m',
      likes: 5,
    },
    {
      id: '6',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      name: 'Bùi Công',
      content: 'Bài viết này giúp tôi rất nhiều.',
      time: '45m',
      likes: 7,
    },
    {
      id: '7',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Hồng Hà',
      content: 'Tôi rất thích bài viết này.',
      time: '1h',
      likes: 14,
    },
    {
      id: '8',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      name: 'Văn Hải',
      content: 'Cảm ơn bạn đã chia sẻ!',
      time: '1h 30m',
      likes: 9,
    },
    {
      id: '9',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      name: 'Thanh Tâm',
      content: 'Quá tuyệt!',
      time: '2h',
      likes: 18,
    },
    {
      id: '10',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      name: 'Đức Minh',
      content: 'Rất hay, tôi sẽ theo dõi.',
      time: '2h 15m',
      likes: 11,
    },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.barHeader}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
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

        {/* Hiển thị bài viết từ fakeArticles */}
        {fakeArticles.map(article => (
          <ArticleComponent
            key={article.id}
            id={article.id}
            imgavatar={article.imgavatar}
            username={article.username}
            time={article.time}
            content={article.content}
            imgcontent={article.imgcontent}
            likecount={article.likecount}
            commentcount={article.commentcount}
          />
        ))}

        {/* Header cho phần Comment */}
        <View style={styles.barComment}>
          <Text style={styles.commentTitle}>
            COMMENTS (<Text>20</Text>)
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.recentText}>Recent</Text>
            <TouchableOpacity onPress={() => {
              /* Xử lý hành động khi click vào Recent */
            }}>
              <Image
                source={require("../../assets/images/arrowbottom.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hiển thị danh sách bình luận */}
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
    paddingHorizontal: 24,
    backgroundColor: '#181A1C',
  },
  barHeader: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
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
    marginTop: 20,
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
