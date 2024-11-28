import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import styles from '../../assets/style/support';
const TermsAndPoliciesScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Image
            source={require('../../assets/images/arowleft.png')}
            resizeMode="contain"
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <View style={styles.barHeader}>
          <Text style={styles.textHeader}>Điều khoản và chính sách</Text>
          <View style={{ height: 2, backgroundColor: '#fff' }} />
        </View>
      </View>
    </View>
  )
}

export default TermsAndPoliciesScreen
