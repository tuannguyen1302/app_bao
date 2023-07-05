// import { ActivityIndicator, Button, Image, FlatList, StyleSheet, Text, View, Dimensions, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, FlatList,Dimensions, TouchableOpacity, Modal, RefreshControl, TextInput, Button, ScrollView } from "react-native";

import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import EditPost from '../EditPost';
import Chitiettintuc from './Chitiettintuc';
// http://192.168.11.107:3000/user
//   http://192.168.1.8:3000/danhsach

const Manhinhdangnhap = (props) => {
    const [showDialog, setshowDialog] = useState(false);
    const [dssp, setdssp] = useState([]);
    const navigation = useNavigation();

    const [isLoading, setisLoading] = useState(false);
    const [img_base64, setimg_base64] = useState(null);
    const [isReloading, setisReloading] = useState(false)
    const [img_source, setimg_source] = useState(null)


    const getListPro = async () => {
        let url_api = 'http://192.168.1.111:3000/danhsach';
        // http://172.20.10.2:3000/user
        // http://172.20.10.2:3000/danhsach
        try {
            const response = await fetch(url_api); // load dữ liệu

            const json = await response.json(); // chuyển dữ liệu thành json

            setdssp(json);// đổ dữ liệu vào state

            console.log("đã có dữ liệu ");

        } catch (error) {
            console.error(error);
        } finally {
            // kết thúc quá trình load dữ liệu, kể cả có lỗi cũng gọi vào lệnh này
            setisLoading(false); // trạng thái không còn load nữa
        }
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getListPro();
        });

        return unsubscribe;
    }, []);



    const renderProduct = ({ item  }) => {

        const deletePost = () => {
            let url_api = "http://192.168.1.111:3000/danhsach/" + item.id;
            fetch(url_api, {
                method: "DELETE",
                headers: {
                    Accept: "application/json", "Content-Type": "application/json"
                },
            })
                .then((res) => {
                    if (res.status == 200) {
                        alert("Deleted");
                        getListPro();
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        return (
            <View style={styles.khung_itempost}>
                <View style={styles.view_item}>
                    <View>
                        <Text
                        onPress={() => getItem()}
                         style={{ fontWeight: "bold", fontSize: 17, marginBottom: 20, width: 280 }}>{item.title}</Text>

                    </View>

                    <View style={styles.view_itemm}>
                        <TouchableOpacity
                            onPress={deletePost}>
                            <Text>xóa </Text>
                        </TouchableOpacity>

                        <EditPost item={item} />
                    </View>
                </View>
                <Image source={{ uri: item.image }} style={styles.img_post}></Image>
                <Text>{item.content}</Text>


            </View>

        )
    }

    const [obju, setobju] = useState({});
    const getLoginInfo = async () => {
        try {
            const value = await AsyncStorage.getItem('LoginInfo')
            if (value != null) {
                setobju(JSON.parse(value));
            }
        } catch (e) {

        }
    }
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getLoginInfo();
        });
        return unsubscribe;
    }, [props.navigation]);
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");

    const savePost = () => {
        let obj_post = { title: title, content: content, image : img_base64 };
        let url_api = "http://192.168.1.111:3000/danhsach";
        if (title.length == 0) {
            alert("Bạn chưa nhập tiêu đề")
            return;
        }
        if (content.length == 0) {
            alert("Bạn chưa nhập nội dung")
            return;
        }
        fetch(url_api, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj_post),
        })
            .then((res) => {
                if (res.status == 201) {
                    alert("Đăng bài thành công");
                    { setshowDialog(false) };
                }
            })
            .catch((ex) => {
                console.log(ex);
            })
    }

    const reloadData = React.useCallback(
        () => {
            // đánh dấu trạng thái đang reload để hiển thị quay quay
            setisReloading(true);
            // các công việc xử lý load lại dữ liệu viết ở dưới đây
            getListPro();

            // mô phỏng sau 2s thì load xong và ẩn biểu tượng
            setTimeout(() => {
                setisReloading(false);
            }, 2000);


        }
    );

    const pickImage = async () => {

        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });


        console.log(result);


        if (!result.canceled) {
            setimg_source(result.assets[0].uri);
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setimg_base64("data:image/" + file_ext + ";base64,/" + res);
                    console.log("zzzzzzzzzzz"+img_base64);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });


        }


    }

    const [tieude, settieude] = useState("")
    const getItem = ({item }) => {
        
        navigation.navigate('chitiet',{item});
        <Chitiettintuc  item={item}/>
    }







    return (

        // <View style={styles.from}>

        //     <Button title="Thêm SP"
        //         onPress={() => { props.navigation.navigate('upnew') }} />
        //     <ScrollView
        //         refreshControl={
        //             <RefreshControl refreshing={isReloading}
        //                 onRefresh={reloadData} />
        //         }
        //     ></ScrollView>
        //     <View style={styles.contener}
        //     >
        //         <Image
        //             style={styles.img}
        //             source={{ uri: item.image }} ></Image>
        //         <View style={{ marginStart: 10, marginTop: 5, padding: 5 }} >
        //             <Text
        //                 onPress={() => getItem(item)}
        //                 style={styles.texttitle} numberOfLines={2}>{item.title}</Text>
        //             <Text numberOfLines={2}>{item.content}</Text>
        //             <Button title='Sửa' onPress={() => { navigation.navigate('suabv') }} />
        //             <Button title='Xóa' onPress={() => { navigation.navigate('xoabv') }} />
        //         </View>

        //     </View>
        //     {
        //         (isLoading) ? (
        //             <ActivityIndicator />
        //         ) : (


        //             <FlatList
        //                 data={dssp}
        //                 keyExtractor={(item_ds) => { return item_ds.id }}
        //                 renderItem={renderProduct}

        //             />
        //         )
        //     }






        // </View>

        <View >
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
                    <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 24, fontWeight: 'bold', color: 'white' }} >Thêm Bài Viết</Text>
                    <Text style={{ marginLeft: 10, color: '#f1f2f6', fontWeight: "bold" }}>{obju.fullname}</Text>
                    <TextInput placeholder="Tiêu đề" style={styles.textInput} onChangeText={(txt) => { settitle(txt) }} />
                    <TextInput placeholder="Nội dung bài viết"
                        style={styles.textInputt}
                        editable
                        multiline
                        numberOfLines={26}
                        maxLength={1000}
                        onChangeText={(txt) => { setcontent(txt) }}
                    />
                    <View style={styles.view_itemmm}>
                        <Text style={{ marginLeft: 10, color: 'white', marginRight: 30, fontSize: 15 }}>Thêm ảnh vào bài viết</Text>
                       
                        <TouchableOpacity
                            onPress={pickImage} >
                            
                           <Text>thêm ảnh </Text>
                        </TouchableOpacity>
                        </View>
                        <Image source={{ uri : img_source }} style={{ width: 110, height: 70, marginTop: 5, marginLeft: 10, borderWidth: 1, borderColor: 'white' }}/>
                   
                 

                    <View style={styles.view_btn}>
                        <TouchableOpacity
                            style={styles.Post}
                            onPress={savePost}>
                            <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }}>{'Post'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        <TouchableOpacity
            onPress={() => { setshowDialog(true) }}
            style={styles.btn_them}
        >
            <Text style={styles.textbtn}>+</Text>
        </TouchableOpacity>
        <ScrollView
            style={{ height: 537 }}
            refreshControl={
                <RefreshControl refreshing={isLoading}
                    onRefresh={reloadData} />
            }
        >
            <FlatList
                data={dssp}
                keyExtractor={(item) => { return item.id }}
                renderItem={renderProduct}
            ></FlatList>
        </ScrollView>

    </View>
    )

}

export default Manhinhdangnhap

const styles = StyleSheet.create({
    img: {
        width: 96,
        height: 96,
        borderRadius: 10

    },
    contener: {
        flexDirection: 'row',
        padding: 10,
        width: Dimensions.get('window').width - 96,



    },
    texttitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    from: {
        margin: 5,
        bottom: 10
    },

    
        
        btn_them: {
            backgroundColor: '#fa983a',
            width: 50,
            borderRadius: 90,
            marginLeft: 320,
            marginTop: 20,
            height: 50
    
        },
        textbtn: {
            color: 'white',
            fontSize: 35,
            textAlign: "center",
            fontWeight: "bold",
        },
        noidung_dialog: {
            backgroundColor: '#4D455D',
            height: 600,
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
            backgroundColor: '#fff',
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
            marginTop: 10
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
            flex: 2,
            flexDirection: "row",
            justifyContent: 'space-between'
    
    
        },
        view_itemm: {
            flexDirection: "row",
    
    
        },
        view_itemmm: {
            flexDirection: "row",
            borderRadius: 10,
            borderWidth: 1,
            margin: 10,
            padding: 5,
            height: 40,
            borderColor: 'white'
    
    
        },
        img_post: {
            width: 300,
            height: 200,
            marginLeft: 26,
            borderRadius: 10,
            marginBottom: 10
        }
    
    

    
})

