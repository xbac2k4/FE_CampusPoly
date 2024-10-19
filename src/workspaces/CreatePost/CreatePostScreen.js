import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PostComponent from '../../components/Post/PostComponent'

const CreatePostScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.barHeader}>
        <TouchableOpacity
          onPress={() => {
            {
              /* Xử lý hành động của nút back */
            }
          }}
          style={styles.circleIcon}>
         <Text style={[styles.textHeader,{color:"#2E8AF6", fontSize: 16,}]}>Discard</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>CREATE</Text>
        <TouchableOpacity
          onPress={() => {
            {
              /* Xử lý hành động của nút Pulish */
            }
          }}
          style={styles.buttonContainer}>
       <Text style={[styles.textHeader,{ fontSize: 16,}]}>Publish</Text>
        </TouchableOpacity>
        {/**Create pót👍 */}
      
      </View>
      <View style={styles.createContaienr}>
        <PostComponent />
      </View>
    </View>
  )
}

export default CreatePostScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#181A1C',
    },
    barHeader:{
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    },
    textHeader: {
        color: '#ECEBED',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'rgl1',
      },
      buttonContainer:{
        backgroundColor:"#F62E8E",
        borderRadius:24,
        width:70,
        height:24,
        alignItems:'center'
      }
})