import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const navleft = ({...props}) => {

  return (
    <View>
      <View>
      <TouchableOpacity onPress={ () => props.navigation.navigate('Home')} style={styles.btnNav}>
      <Text>Home</Text>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity style={styles.btnNav}>
      <Text>Sair</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default navleft;

const styles = StyleSheet.create({
  btnNav:{
    padding:10,
    borderBottomColor: '#ead7d7',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  }
});
