import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const navleft = ({...props}) => {
  return (
    <View>
      <View>
      <TouchableOpacity onPress={ () => props.navigation.navigate('Home')}>
      <Text>Home 1</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default navleft;

const styles = StyleSheet.create({});
