import * as React from 'react';
import { Animated, Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useEffect, useRef } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




import Getstart from './comp/Getstart';


export default function App() {
  
  return (
     <Getstart/> 
    //  <Manhinhdangnhap/>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
