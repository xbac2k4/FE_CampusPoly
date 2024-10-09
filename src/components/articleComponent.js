import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
const ArticleComponent = ({ imgavatar, username, time, content, imgcontent, }) => {
    return (
        <View style={styles.container}>
            <View style={{ height: 1, backgroundColor: '#fff', marginBottom: 15 }} />
            <View style={styles.headerContent}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require("../assets/image/test2.jpg")} style={styles.imageavatar} />
                    <View style={{ marginLeft: 6, marginTop: -5 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14, letterSpacing: 1.6, fontFamily: "HankenGrotesk-Regular" }}>Phạm Việt Anh</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'HankenGrotesk-Regular', fontWeight: "medium", color: '#727477' }}>20m ago</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Icons name="menu" color={"#727477"} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.bodyContent}>
                <Text style={{ fontFamily: 'rgl1', fontSize: 16, fontWeight: '500', color: "#fff", letterSpacing: 1.4 }} >
                    “If you think you are too small to make a difference, try sleeping with a mosquito.” ~ Dalai Lama
                </Text>
                <TouchableOpacity>
                    <Image source={require("../assets/image/test3.jpg")} style={styles.imgContent} />
                </TouchableOpacity>
            </View>
            <View style={styles.interactContainer}>
            <View style={{flexDirection:"row"}}>
            <View style={styles.iconLike}>
                <Icons name="like2" color="#ECEBED" size={16} />
                <Text style={styles.textInteract}>17</Text>
                </View>  
                <View style={styles.iconLike}>
                <Icons name="comment" color="#ECEBED" size={16} />
                <Text style={styles.textInteract}>17</Text>
                </View>  
                <View style={styles.iconLike}>
                <Icons name="share" color="#ECEBED" size={16} />
                </View>
                
                </View>  
            <TouchableOpacity style={{ marginTop:5,}}>  
                <Icons name="bookmark" color={"#ECEBED"} size={16}/>
            </TouchableOpacity>
            </View>
            <View style={{ height: 1, backgroundColor: '#fff', marginTop: 15 }} />
        </View>
    )
}

export default ArticleComponent

const styles = StyleSheet.create({
    headerContent: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    imageavatar: {
        width: 32,
        height: 32,
        borderRadius: 100
    },
    bodyContent: {
        marginTop: 10,
        alignItems: 'center'
    },
    imgContent: {
        width: 340,
        height: 180,
        borderRadius: 16,
        marginTop: 10
    },
    interactContainer:{
        flexDirection:'row',
        marginTop:10,
        paddingHorizontal:10,
        justifyContent:'space-between'
    },
    iconLike:{
        marginLeft:10,
        alignItems:'center',
        flexDirection:"row",
        marginRight:9
    },
    textInteract:{
        fontFamily:'rgl1',fontSize:16,color:'#fff',marginLeft:5,fontWeight:'bold'
    }
})