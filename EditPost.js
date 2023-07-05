import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

const EditPost = (props) => {
    const [showDialog, setshowDialog] = useState(false);
    const [title, settitle] = useState(props.item.title);
    const [content, setcontent] = useState(props.item.content);

    const saveEdit = () => {
        let id = props.item.id;
        let obj_post = { title: title, content: content };
        let url_api = "http://192.168.11.107:3000/danhsach/"+ id;
        fetch(url_api,{
            method:'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj_post)
        })
        .then((res)=>{
            if(res.status==200){
                alert("Sua thanh cong");
                { setshowDialog(false) };
            }
        })
        .catch((ex)=>{
            console.log(ex)
        })

    }
    return (
        <View>
            <Modal visible={showDialog}
                transparent={true}
                animationType="fade"
                onRequestClose={() => { setshowDialog(false); }}>
                <View style={styles.khung_dialog}>
                    <View style={styles.noidung_dialog}>
                        <TouchableOpacity
                            style={styles.andialog}
                            onPress={() => { setshowDialog(false) }}>
                            <Text style={{ color: 'red', fontWeight: "bold", textAlign: 'right', marginRight: 20, fontSize: 20, marginTop: 10 }}>{'X'}</Text>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 24, fontWeight: 'bold', color: 'white' }}>Sửa Bài Viết</Text>
                        
                        <TextInput placeholder="Tiêu đề" style={styles.textInput} onChangeText={(txt) => { settitle(txt) }} value={title} />
                        <TextInput placeholder="Nội dung bài viết"
                            style={styles.textInputt}
                            value={content}
                            editable
                            multiline
                            numberOfLines={26}
                            maxLength={1000}
                            onChangeText={(txt) => { setcontent(txt) }}
                        />
                        <View style={styles.view_btn}>
                            <TouchableOpacity
                                style={styles.Post}
                                onPress={saveEdit}>
                                <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }}>{'Save'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={()=>{setshowDialog(true)}}>
                <Text>Sửa</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditPost;

const styles = StyleSheet.create({
    textbtn: {
        color: 'white',
        fontSize: 35,
        textAlign: "center",
        fontWeight: "bold",
    },
    noidung_dialog: {
        backgroundColor: '#747d8c',
        height: 500,
        width: '90%',
        borderRadius: 10

    },
    khung_dialog: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    khung_itempost: {
        margin: 10,
        backgroundColor: '#ced6e0',
        padding: 10,
        borderRadius: 9
    },
    textInput: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    textInputt: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        height: 200
    },
    view_btn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40
    },
    Post: {
        borderWidth: 1,
        width: 230,
        alignItems: "center",
        borderColor: '#ecf0f1',
        borderRadius: 15,
        height: 43,
        padding: 7,
        backgroundColor: '#fa983a'
    },
    img: {
        width: 25,
        height: 25,
        marginLeft: 10
    },
    view_item: {
        flexDirection: "row",


    },
    view_itemm: {
        flexDirection: "row",
        marginLeft: 200

    }
})