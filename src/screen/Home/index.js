import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Button, StyleSheet,} from 'react-native';
//import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Svg, { G, Path, SvgUri } from 'react-native-svg';
import {styles} from '../../style';



const Home = ({navigation}) => {

    return (
        <ImageBackground source={require("../../img/bkgEntrada.png")}
          blurRadius={2}
          opacity={1}
          style={{ flex: 1, resizeMode: 'cover' }}>
          <Svg width={411} height={496} fill="none">
            <Path opacity={0.9} d="M-7-10l419-7 4.5 512.5L-7 284.901V-10z" fill="#4D0303" />
            <View style={stl.boxImgLogo} >
              <Image style={stl.imgLogo} source={require("../../img/logo.png")} />
            </View>
          </Svg>
          <View style={styles.areaBtnHome}>
            <TouchableOpacity onPress={() => navigation.navigate('Cardapio')} style={styles.btnR}>
              <Text style={styles.txtBtn}>Cardápio</Text>
            </TouchableOpacity>
      
      {/*}
            <TouchableOpacity onPress={() => sair()} style={styles.btnO}>
              <Text style={styles.txtBtn}>Sair</Text>
            </TouchableOpacity>
    {*/}
          </View>
        </ImageBackground>
      );
}

export default Home;

const stl = StyleSheet.create({
    container: {
      paddingLeft: 30,
      paddingRight: 30,
    },
    btnEntrar: {
      backgroundColor: '#FF7A00',
      borderRadius: 10,
      padding: 10,
      elevation: 5,
      marginBottom: 20,
    },
    txtBtnEntrar: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    btnCad: {
      padding: 10,
      elevation: 5,
    },
    txtBtnCad: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    boxImgLogo: {
      alignItems: 'center',
    },
    imgLogo: {
      resizeMode: 'contain',
      width: 280,
    }
  });