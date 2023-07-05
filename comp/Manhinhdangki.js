import { Alert, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ItemList from '../item/ItemList'


const Manhinhdangki = ({ navigation }, { props }) => {

    const [getpassworsvisible, setgetpassworsvisible] = useState(false);
    const [comfirmpasswd, setcomfirmpasswd] = useState(0);

    const [pass_add, setpass_add] = useState(0);
    const [email_add, setemail_add] = useState("");
    const [role_add, setrole_add] = useState(0);


    //http://192.168.11.107:3000/user
    const kiemtramk = () => {

        if (email_add.length == 0) {
            alert("Chưa nhập email"); return;
        }
        if (pass_add.length == 0) {
            alert("Chưa nhập Password"); return;
        }
        if (comfirmpasswd.length == 0) {
            alert("Password chưa đúng "); return;
        }

        if (pass_add !== comfirmpasswd) {
            alert("Mật khẩu không trùng khớp ");
            return;
        }
        else {


            // post lên api  

            let objus = { user: email_add, password: pass_add, role: role_add };
            let url_api =
                "http://http://192.168.1.111:3000/user";

            fetch(url_api, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objus),
            })
                .then((res) => {
                    if (res.status == 201)
                        alert("Thêm thành công");
                })
                .catch((ex) => {
                    console.log(ex);
                });

            alert("Tạo Tài khảon thành công");



            navigation.navigate('logIn');

            console.log("tạo tài khoản thành công");


        }


    }





    return (
        <ImageBackground
            style={styles.bgnen}
            resizeMode="stretch"
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgMfR3e8vsapA3aNtfgTxaNRnv5FuU13zjKg&usqp=CAU' }}>
            <StatusBar barStyle="light-content" />

            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.header}> NEWSPAPER</Text>
                {/* email && password */}

                <View style={styles.layoutfrom}>
                    {/* // email */}
                    <View style={styles.eamilfrom}>
                        <Text style={styles.email}>Email : </Text>
                        <TextInput style={styles.nhapemail} onChangeText={(txt) => { setemail_add(txt) }}></TextInput>


                    </View>
                    {/* password */}
                    <View style={styles.passfrom}>
                        <Text style={styles.pass}>Password : </Text>
                        <TextInput style={styles.nhappass}
                            secureTextEntry={getpassworsvisible ? false : true}
                            onChangeText={(txt) => { setpass_add(txt) }}
                            textContentType="password">

                        </TextInput>
                        {/* biểu tưởng con mắt  */}
                        <TouchableOpacity style={{ width: 40, height: 40, marginLeft: 3, }}
                            onPress={() => setgetpassworsvisible(!getpassworsvisible)}
                        >
                            {getpassworsvisible ? <Image
                                resizeMode='stretch'
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2767/2767146.png' }}
                                style={{ width: '100%', height: '100%', marginLeft: 1, }}
                            />
                                :
                                <Image
                                    resizeMode='stretch'
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/159/159604.png' }}
                                    style={{ width: '100%', height: '100%', marginLeft: 1, }}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.passfrom}>
                        <Text style={styles.pass}>Password : </Text>
                        <TextInput style={styles.nhappass}
                            secureTextEntry={getpassworsvisible ? false : true}
                            onChangeText={(txt) => { setcomfirmpasswd(txt) }}
                            placeholder="comfirm password"
                            textContentType="password">


                        </TextInput>
                        {/* biểu tưởng con mắt  */}
                        <TouchableOpacity style={{ width: 40, height: 40, marginLeft: 3, }}
                            onPress={() => setgetpassworsvisible(!getpassworsvisible)}
                        >
                            {getpassworsvisible ? <Image
                                resizeMode='stretch'
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2767/2767146.png' }}
                                style={{ width: '100%', height: '100%', marginLeft: 1, }}
                            />
                                :
                                <Image
                                    resizeMode='stretch'
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/159/159604.png' }}
                                    style={{ width: '100%', height: '100%', marginLeft: 1, }}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {/* đăng nhập */}

                <View style={styles.fromdangnhap} >

                    <TouchableOpacity
                        onPress={kiemtramk}

                        style={{ width: '60%', height: '30%', borderWidth: 2, borderRadius: 100, backgroundColor: '#3366CC', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 25, }}>
                            Tạo Tài Khoản
                        </Text>
                    </TouchableOpacity>
                </View>


            </SafeAreaView>



        </ImageBackground>

    )
}

export default Manhinhdangki





const styles = StyleSheet.create({
    bgnen: {
        width: '100%',
        height: '100%',

    },
    header: {
        alignSelf: 'center',
        fontSize: 40,
        marginTop: 30,
        fontWeight: 'bold',
        color: '#1C315E',
        fontStyle: "italic",
    },
    layoutfrom: {
        width: '95%',
        height: '40%',
        // backgroundColor:'green',
        marginTop: 90,
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        textAlign: 'right',
        padding: 10



    },
    eamilfrom: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderWidth: 1,
        padding: 5,
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#1C315E'


    },
    email: {
        marginLeft: 2,
        color: '#fff',
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    nhapemail: {
        borderBottomWidth: 1,
        // borderBottomColor: '#fff',
        height: '100%',
        width: '68%',
        autoCapitalize: 'none',
        color: '#fff',
        fontSize: 20,
        marginLeft: 8,


    },
    passfrom: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderWidth: 1,
        padding: 5,
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#1C315E',
        textAlign: 'right',
    },
    pass: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 2,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    nhappass: {
        borderBottomWidth: 1,
        // borderBottomColor: '#fff',
        height: '100%',
        width: '45%',
        autoCapitalize: 'none',
        color: '#fff',
        fontSize: 20,
        marginLeft: 8,

    },
    fromdangnhap: {
        width: '100%',
        height: '20%',

        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'


    },
})

