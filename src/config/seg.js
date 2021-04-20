import React, {useEffect,useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

export default function Seg({...props}){
  const [auto,setAuto] = useState(0);
  useEffect(() =>{
    setAuto(1)
    auth().onUserChanged((user) => {
      if(!user){
        props.navigation.navigate('Login');
      }
    });
  },[auto]);
}