import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from '../../assets/style/ReportStyle';
import LinearGradient from 'react-native-linear-gradient';

const ReportIssueScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');

  const handleSend = async () => {
    if (!email || !issue) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const mailData = {
      from: { email: 'your-email@example.com', name: 'CampusPoly Support' },
      to: [{ email: 'thangnam19218@gmail.com' }],
      subject: 'Báo cáo sự cố từ người dùng',
      text: `Email của người báo cáo: ${email}\n\nMô tả sự cố: ${issue}`,
    };

    try {
      const response = await axios.post(
        'https://api.mailersend.com/v1/email',
        mailData,
        {
          headers: {
            Authorization: `Bearer mlsn.5706748ada7d39b19fc96de5b768fef916ed21227958269acc0d5a7b67c35527`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 202) {
        Alert.alert('Thành công', 'Cảm ơn bạn đã báo cáo sự cố! Chúng tôi sẽ phản hồi sớm nhất.');
        setEmail('');
        setIssue('');
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình gửi email.');
      }
    } catch (error) {
      console.error('Error sending email: ', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình gửi email.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Image
            source={require('../../assets/images/arowleft.png')}
            resizeMode="contain"
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <View style={styles.barHeader}>
          <Text style={styles.textHeader}>Báo cáo sự cố</Text>
        </View>
        <Text style={styles.descriptionText}>
          Bạn đang gặp sự cố? Vậy hãy nhắn tin cho chúng tôi.
        </Text>

        {/* Form nhập liệu */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email của bạn</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email của bạn"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Sự cố bạn gặp</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Mô tả sự cố của bạn"
            placeholderTextColor="#888"
            value={issue}
            onChangeText={setIssue}
            multiline
            numberOfLines={4}
          />
          <LinearGradient
            colors={['#F7B733', '#FC4A1A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
              <TouchableOpacity onPress={handleSend} style={{ width: '100%', alignItems: 'center' }}>
              <Text style={styles.submitButtonText}>Gửi</Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </ScrollView>
    </View>
  );
};

export default ReportIssueScreen;
