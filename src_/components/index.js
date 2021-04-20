import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon, Card, Input } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../style';
import DadosApp from '../config/index_bkp';

const INF = DadosApp();

export const HeaderLogin = () => {
  return (
    <View>
      <ImageBackground
        source={require('../img/Header_Homer.png')}
        style={styles.ImgTopHome}>
        <Text style={styles.Headertxt}>{INF.Nome_App}</Text>
      </ImageBackground>
      <View style={styles.ViewLogo}>
        <Image
          source={require('../img/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export const HeaderGeral = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.boxBarNav}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconMenuL}>
        <Icon name="menu" color="#fff" />
      </TouchableOpacity>
      <View>
  <Text style={styles.txtTituloNav}>{INF.Nome_App}</Text>
      </View>
      <View>
        {/*botão de menu direito*/}
        {/*<Icon name="menu" color="#fff" />*/}
      </View>
    </View>
  );
};

export const FooterBottom = () => {
  return (
    <View>
      <Text />
    </View>
  );
};


