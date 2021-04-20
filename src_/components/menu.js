import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import NavLeft from './navleft';
import NavLeft1 from './navleft1';
import NavLeft2 from './navleft2';


export const Navleft = ({ nivel, ...props }) => {


  switch (nivel) {
    case 0:
      return <NavLeft navigation={props.navigation} />;
      break;
    case 1:
      return <NavLeft1 navigation={props.navigation} />;
      break;
    case 2:
      return <NavLeft2 navigation={props.navigation} />;
      break;
  }

};


const styles = StyleSheet.create({});
