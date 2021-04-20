import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, BackHandler} from 'react-native';
import auth from '@react-native-firebase/auth';

const navleft = ({...props}) => {
  return (
    <View>

      <View>
      <TouchableOpacity onPress={ () => props.navigation.navigate('Home')}>
      <Text>Home 2</Text>
      </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity onPress={ () => props.navigation.navigate('PosCadastro')}>
      <Text>Cadastro Perfil</Text>
      </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity onPress={ () => props.navigation.navigate('CadastroEndereco')}>
      <Text>Cadastro Endereço</Text>
      </TouchableOpacity>
      </View>
      
      <View>
      <TouchableOpacity onPress={ () => props.navigation.navigate('Cardapio')}>
      <Text>Pratos do dia</Text>
      </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity onPress={ () => {
        auth().signOut();
        BackHandler.exitApp();
        //props.navigation.navigate("Login")
        } }>
      <Text>Sair</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};

export default navleft;

const styles = StyleSheet.create({});
