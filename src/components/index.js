import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon, Card, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../style';
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

export const HeaderGeral = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.boxBarNav}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconMenuL}>
          <Icon
            name='bars'
            type='font-awesome'
            color='#fff'
          />
        </TouchableOpacity>
        <View>
          <Image style={{ resizeMode: 'contain', width: 40, height: 40, marginRight: 10 }} source={require('../img/logo.png')} />
        </View>
        <View>
          <Text style={styles.txtTituloNav}>{INF.Nome_App}</Text>
        </View>
        <View>
          {/*botão de menu direito*/}
          {/*<Icon name="menu" color="#fff" />*/}
        </View>
      </View>
      {/* <ImageBackground style={{width:'100%', height:150}} source={require('../img/headerG.png')}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent:'center',
          alignItems:'center',
        }}>
        <Text style={{
          color:'#FFAF00',
          fontSize:30,
          fontWeight: 'bold',
          textAlign: 'center',
          
        }}>{props.tituloHead}</Text>
        </View>
      </ImageBackground> */}
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


