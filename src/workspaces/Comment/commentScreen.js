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

const CommentScreen = () => {
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
  return (
    <ScrollView style={styles.container}>
      <View style={styles.barHeader}>
        <TouchableOpacity
          onPress={() => {
            {
              /* Xử lý hành động của nút back */
            }
          }}
          style={styles.circleIcon}>
          <Image
            source={require('../../assets/images/arowleft.png')}
            resizeMode="contain"
            style={{width: 15, height: 15}}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>POST</Text>
        <Text style={[styles.textHeader, {color: '#181A1C'}]}>Post</Text>
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
      {/**Sử lí Comment */}
      <View style={styles.barComment}>
        <Text
          style={{
            fontFamily: 'rgl1',
            fontSize: 14,
            fontWeight: 'regular',
            color: '#ECEBED',
          }}>
          COMMENTS (<Text>20</Text>)
        </Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text
          style={{
            fontFamily: 'rgl1',
            fontSize: 14,
            fontWeight: 'semibold',
            color: '#ECEBED',
            marginRight:3
          }}>
          Recent
        </Text>
        <TouchableOpacity onPress={()=>{
            /* Xử lý hành đ��ng khi click vào Recent */
        }}>
            <Image source={require("../../assets/images/arrowbottom.png")} style={{width:20,height:20}}/>
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
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
});
