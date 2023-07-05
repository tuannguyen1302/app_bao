import { Image, ImageBackground, Button, SafeAreaView, StatusBar, StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'

// import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }, { props }) => {


    const [username, setusername] = useState("")
    const [passwd, setpasswd] = useState("");

    const [getpassworsvisible, setgetpassworsvisible] = useState(false);


    const doLogin = () => {
        // kiểm tra hợp lệ dữ liệu
        if (username.length == 0) {
            alert("Chưa nhập username"); return;
        }
        if (passwd.length == 0) {
            alert("Chưa nhập Password"); return;
        }
        // link api check login
        let url_check_login = 'http://192.168.1.111:3000/quantri?username=' + username;
        let url_check_login1 = 'http:/192.168.1.111:3000/user?user=' + username;

        fetch(url_check_login1 || url_check_login )

            .then((res) => { return res.json(); })
            .then(async (arr_user) => {
                if (arr_user.length != 1) {
                    alert("Không tồn tại username hoặc CSDL bị trùng lặp " + arr_user.length);

                    return;
                }


                let objU = arr_user[0];
                if (objU.password != passwd) {
                    alert("Sai password"); return;
                }
                // đến dưới này là đúng thông tin người dùng==> ghi vào storage

                try {
                    await AsyncStorage.setItem('loginInfo', JSON.stringify(objU));
                    console.log("Ghi dữ liệu thành công");
                    navigation.navigate('dangnhap');
                } catch (e) {
                    // saving error
                    console.log(e);
                }



            })
            .catch((err) => {
                console.log(err);
            })




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
                        <TextInput style={styles.nhapemail} onChangeText={(txt) => { setusername(txt) }}></TextInput>


                    </View>
                    {/* password */}
                    <View style={styles.passfrom}>
                        <Text style={styles.pass}>Password : </Text>
                        <TextInput style={styles.nhappass}
                            secureTextEntry={getpassworsvisible ? false : true}
                            onChangeText={(txt) => { setpasswd(txt) }}
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


                        onPress={doLogin}


                        style={{ width: '60%', height: '30%', borderWidth: 2, borderRadius: 100, backgroundColor: '#3366CC', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 25, }}>
                            Đăng Nhập
                        </Text>
                    </TouchableOpacity>
                    {/* <Button title="Login" onPress={doLogin} /> */}


                    <TouchableOpacity
                        onPress={() => { navigation.navigate('dangki') }}

                        style={{ width: '60%', height: '30%', borderWidth: 2, borderRadius: 100, backgroundColor: '#6A5ACD', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 25, }}>
                            Đăng Kí
                        </Text>
                    </TouchableOpacity>


                </View>


            </SafeAreaView>
        </ImageBackground>

    )
}

export default Login

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
        height: '28%',
        // backgroundColor:'green',
        marginTop: 90,
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        textAlign: 'right',



    },
    eamilfrom: {
        width: '90%',
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
        width: '90%',
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