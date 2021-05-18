import React, { useState, useEffect, useCallback } from 'react';
//import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import DadosApp from '../config';

const DB = db().collection(DadosApp().Categoria).doc(DadosApp().ID_APP);

const navleft = ({ ...props }) => {

  const getUser = auth().currentUser == null?"semId": auth().currentUser;
  const uid = getUser.uid == undefined?"semId":getUser.uid;
  const [dadosUser, setDadosUser] = useState([]);
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    const subscriber = DB.collection('PerfilUsuario')
      .where('ID_USER', '==', uid)
      .onSnapshot(snp => {
        setDadosUser(snp.docs);
      });
    return () => subscriber();
  }, []);

  const Header = () => {
    const dados = dadosUser.map((dd, index) => {
      let DD = dd.data();
      let Nome = DD.Nome;
      let Email = DD.Email;
      return (
        <View key={index} style={styles.header}>
          <View style={styles.imgUser}>
            <Text style={styles.txtImgUser}>{Nome.substr(0, 1)}</Text>
          </View>
          <View>
            <Text style={styles.txtNomeUser}>{Nome}</Text>
          </View>
          <View>
            <Text style={styles.txtEmail}>{Email}</Text>
          </View>
        </View>
      );
    });

    return dados;
  };

  const Sobre = () => {
    Alert.alert(
      "Informação!",
      "Este App está em fase (BETA)"
    );
  };
  return (
    <View>
      <Header />
      <View style={{}}>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Cardapio')} style={styles.boxLinks}>
            <View style={styles.boxIcon}>
              <Icon color="#4D0303" name='home' type="font-awesome-5" />
            </View>
            <View>
              <Text style={styles.txtLink}>Home</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Configuracao')} style={styles.boxLinks} >
            <View style={styles.boxIcon}>
              <Icon color="#4D0303" name="tools" type="font-awesome-5" />
            </View>
            <View>
              <Text style={styles.txtLink}>Configuração</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => {
            Sobre()
          }} style={styles.boxLinks} >
            <View style={styles.boxIcon}>
              <Icon color="#4D0303" name="info" type="font-awesome-5" />
            </View>
            <View>
              <Text style={styles.txtLink}>Sobre</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => {
            auth().signOut();
            BackHandler.exitApp();
          }} style={styles.boxLinks} >
            <View style={styles.boxIcon}>
              <Icon color="#4D0303" name="sign-out-alt" type="font-awesome-5" />
            </View>
            <View>
              <Text style={styles.txtLink}>Sair</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

export default navleft;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4D0303",
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  imgUser: {
    backgroundColor: '#FFAF00',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
  },
  txtImgUser: {
    color: '#4D0303',
    fontWeight: 'bold',
    fontSize: 22,
  },
  txtNomeUser: {
    color: '#fff',
    fontSize: 14,
  },
  txtEmail: {
    color: '#999',
    fontSize: 10
  },
  boxLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  boxIcon: {
    width: 50,
    marginBottom: 10,
  },
  icon: {
    color: '#4D0303',
  },
  txtLink: {
    color: '#C23A0F'
  }

});
