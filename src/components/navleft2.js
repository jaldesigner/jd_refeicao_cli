import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Image } from 'react-native';
import auth from '@react-native-firebase/auth';

const navleft = ({ ...props }) => {
  var str = "JAL";
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.imgUser}>
          <Text style={styles.txtImgUser}>{str.substr(0, 2)}</Text>
        </View>
        <View>
          <Text style={styles.txtNomeUser}>Jonas (sem farofa)</Text>
        </View>
        <View>
          <Text style={styles.txtEmail}>jonasjaldesigner@gmail.com</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cardapio')}>
          <Text>Pratos do dia</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => {
          auth().signOut();
          BackHandler.exitApp();
          //props.navigation.navigate("Login")
        }}>
          <Text>Sair</Text>
        </TouchableOpacity>
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
    fontSize: 18,
  },
  txtNomeUser: {
    color: '#fff',
    fontSize: 14,
  },
  txtEmail: {
    color: '#999',
    fontSize: 10
  }

});
