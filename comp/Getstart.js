import * as React from 'react';
import { useContext } from 'react'
import { Animated, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useEffect, useRef } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Manhinhdangnhap from './Manhinhdangnhap';
import Manhinhdangki from './Manhinhdangki';
import Chitiettintuc from './Chitiettintuc';


// màn hình chờ 
const GetStart = ({ navigation }) => {
    // animation
    const lacani = useRef(new Animated.Value(0)).current;
    const spin = lacani.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-45deg', '0deg', '45deg']
    })

    useEffect(() => {
        setTimeout(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(
                        lacani, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: 'false',

                    }
                    ),
                    Animated.timing(
                        lacani, {
                        toValue: -1,
                        duration: 1000,
                        useNativeDriver: 'false',

                    }
                    ),
                    Animated.timing(
                        lacani, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: 'false',

                    }
                    ),

                ])).start();

        }, 1000);
    },
        []);




    return (
        
            <SafeAreaView>
                <StatusBar barStyle="light-content" />
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    resizeMode="stretch"
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBDVh6hLWVVPxh4YS-du3sTZ05VlhtIv8m_g&usqp=CAU' }}>
                    <Text style={styles.header}> NEWSPAPER</Text>
                    <Text style={styles.hello}>Welcome to us</Text>
                    <Text style={styles.noidung}>Find out what's new today</Text>

                    {/* <Image source={{uri:'image.png'}}/> */}
                    <Animated.View style={{ transform: [{ rotate: spin }] }} >
                        <Image
                            style={styles.img}
                            resizeMode="stretch"
                            source={{ uri: 'https://o.remove.bg/downloads/f80d5db0-eda3-4a7a-819d-c7b313d50a93/t%E1%BA%A3i_xu%E1%BB%91ng-removebg-preview.png' }} />

                    </Animated.View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('logIn') }} style={styles.appButtonContainer}>
                            <Text style={styles.appButtonText}>{"Get Start "}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </SafeAreaView>
     

    );
}



const stackGetstart = createNativeStackNavigator();

const User = () => {
    return (
        <stackGetstart.Navigator initialRouteName='getstart'>
            <stackGetstart.Screen name='getstart' component={getStart} options={{ title: 'Get Start ' }} />
            <stackGetstart.Screen name='logIn' component={Login} options={{ title: 'Đăng Nhập ' }} />
            <stackGetstart.Screen name='dangnhap' component={Manhinhdangnhap} />
            <stackGetstart.Screen name="dangki" component={Manhinhdangki} options={{ title: 'màn hình chính' }} />

            {/* viết tiếp các màn hình khác vào đây */}
        </stackGetstart.Navigator>
    )

}
const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Upnew' component={Upnew} />
        </Tab.Navigator>
    )

}


const Getstart = () => {


    return (


        <NavigationContainer>
            <stackGetstart.Navigator initialRouteName='getStart' options={{ headerShown: false }} >
                <stackGetstart.Screen name='getStart' component={GetStart} options={{ title: 'Get Start ' }} />
                <stackGetstart.Screen name='logIn' component={Login} options={{ title: 'Đăng Nhập ' }} />
                <stackGetstart.Screen name='dangnhap' component={Manhinhdangnhap} />
                <stackGetstart.Screen name="dangki" component={Manhinhdangki} options={{ title: 'màn hình chính' }} />
                <stackGetstart.Screen name='chitiet' component={Chitiettintuc}/>
                
                {/* viết tiếp các màn hình khác vào đây */}
            </stackGetstart.Navigator>
        </NavigationContainer>


    )


}

export default Getstart

const styles = StyleSheet.create({
    appButtonContainer: {
        width: '50%',
        margin: 10,
        marginTop: 80,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginLeft: 90

    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",

    },
    header: {
        alignSelf: 'center',
        fontSize: 40,
        marginTop: 30,
        fontWeight: 'bold',
        color: '#1C315E',
        fontStyle: "italic",
    },
    hello: {
        marginLeft: 70,
        marginTop: 80,
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: "italic",
        color: '#3300CC',
    },
    noidung: {
        marginLeft: 80,
        marginTop: 5,
        fontSize: 20,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontStyle: "italic",
        color: '#3300CC',
    },
    img: {
        width:150,
        height: 150,
        justifyContent: "center",
        alignContent: 'center',
        marginTop: 100,
        marginLeft: 120,

    },




})