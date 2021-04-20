import React from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';

// import { Container } from './styles';

const components = () => {
  return (
      <View style={{justifyContent: 'center', flexDirection: 'column'}}>
          <Image style={{width: '100%', resizeMode: 'contain',}} source={require('../img/logo.png')} />
          <ActivityIndicator />
      </View>
  );
}

export default components;