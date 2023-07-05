import { Image, StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'


const ItemList = (props) => {
    const { dulieu } = props;


    return (
        <View style={styles.contener}>
            <Image
                style={styles.img}
                source={{ uri: dulieu.image }} ></Image>
            <View style={{ marginStart: 10, marginTop: 5, padding: 5 }} >
                <Text style={styles.texttitle }  numberOfLines={2}>{dulieu.title}</Text>
                <Text numberOfLines={2}>{dulieu.content}</Text>
            </View>
        </View>



    )
}

export default ItemList

const styles = StyleSheet.create({
    img: {
        width: 96,
        height: 96,
        borderRadius: 10

    },
    contener: {
        flexDirection: 'row',
        padding: 10,
        width: Dimensions.get('window').width -96,
        
        },
    texttitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },

})
