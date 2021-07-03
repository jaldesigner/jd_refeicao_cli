import React, {useEffect, useState} from 'react';
//import { NetInfoState } from '@react-native-community/netinfo';
import NetInf from '@react-native-community/netinfo';
import { StyleSheet, Text, View } from 'react-native'

const CheckNet = () => {
const [connState,setConnState] =  useState(0);

  useEffect(() => {
    NetInf.fetch().then(state => {
      setConnState(state);
      console.log("Tipo de conexão",state.type);
      console.log("Estado da conexão",state.isConnected);
    });

    const unsubscrib = NetInf.addEventListener(state => {
      setConnState(state);
      console.log("Tipo de conexão",state.type);
      console.log("Estado da conexão",state.isConnected);
    });

    return () => {
      unsubscrib();
    };
  },[]);


  return (
    <View />
  )
}

export default CheckNet

const styles = StyleSheet.create({});
