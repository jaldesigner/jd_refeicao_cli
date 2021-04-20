import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';

import { Button, SocialIcon } from 'react-native-elements';
import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { styles } from '../../style';
import { set } from 'react-native-reanimated';

const aut = auth();

export default function Login({ navigation }) {

  /* -------------------------------------------------------------------------- */
  /*                        Declaramos os estados do app                        */
  /* -------------------------------------------------------------------------- */
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [userId, setUserId] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  /* -------------------------------------------------------------------------- */
  /*                      Verifica se o usuário estã logado                     */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {

    aut.onUserChanged(v => {
      
        if(v){
          navigation.navigate('Home');
        }else{
          return null;
        }
    });

  }, [aut]);
  /* -------------------------------------------------------------------------- */
  /*                 Função assincrona para fazer o login no app                */
  /* -------------------------------------------------------------------------- */
  async function logar() {
    if (email !== '' || senha !== '') {
      try {
        await aut.signInWithEmailAndPassword(email, senha);
        setErro('');
        navigation.navigate('Home');
      } catch (err) {

        switch (err.code) {
          case 'auth/user-not-found':
            setErro('Email ou senha incorretos!');
            setSucesso('');
            break;
          case 'auth/wrong-password':
            setErro('Senha incorreta!');
            setSucesso('');
            break;
          default:
            console.log(err.message);
            setSucesso('');
            break;
        }
      }
    } else {
      setErro("Entre com email e senha cadastrados");
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                    Componente para as mensagem de erros                    */
  /* -------------------------------------------------------------------------- */

  const MsgErro = () => {
    if (erro !== '') {
      return (
        <View style={styles.msgErro}>
          <View><Text style={styles.txtMsgErro}>{erro}</Text></View>
        </View>
      );
    }
    return <View />;
  }

  /* -------------------------------------------------------------------------- */
  /*                  Componente para as mensagens de sucesso!                  */
  /* -------------------------------------------------------------------------- */

  const MsgSucesso = () => {
    if (sucesso !== '') {
      return (
        <View style={{ backgroundColor: '#0df2c9', padding: 5, marginBottom: 20, borderRadius: 10, elevation: 5, }}>
          <View><Text style={{ color: '#fff', fontSize: 23, textAlign: 'center' }}>{sucesso}</Text></View>
        </View>
      );
    }
    return <View />
  }

  /* -------------------------------------------------------------------------- */
  /*                               UI da Aplicação                              */
  /* -------------------------------------------------------------------------- */

  return (
    <ImageBackground source={require("../../img/bkgEntrada.png")}
      blurRadius={5}
      opacity={1}
      style={stl.bkg}>
      <ScrollView>
        <Image style={stl.imgLogo} source={require("../../img/logo.png")} />
        <View style={stlLogin.boxInput}>
          <MsgErro />
          <MsgSucesso />
          <View>
            <Text style={stlLogin.txtInput}>Email</Text>
            <TextInput
              placeholder="Entre com seu e-mail"
              keyboardType='email-address'
              value={email}
              onChangeText={email => setEmail(email)}
              autoCompleteType='email'
              style={stlLogin.cmpInput}
            />
          </View>
          <View style={{ marginBottom: 30, }}>
            <Text style={stlLogin.txtInput}>Senha</Text>
            <TextInput
              placeholder="Entre com sua senha"
              autoCompleteType='password'
              secureTextEntry={true}
              value={senha}
              onChangeText={senha => setSenha(senha)}
              style={stlLogin.cmpInput}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => logar()} style={stl.btnEntrar}>
              <Text style={stl.txtBtnEntrar}>Entrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.areaBtnHome}>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.btnLink}>Cadastra-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}


/* -------------------------------------------------------------------------- */
/*                       Tratamento do estilo da página                       */
/* -------------------------------------------------------------------------- */

const stlLogin = StyleSheet.create({
  boxInput: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    alignItems: 'stretch',
    alignContent: 'space-between',
  },
  cmpInput: {
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: '#fff',
    fontSize: 18,
    color: '#5C3938',
  },
  txtInput: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
});

const stl = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  btnEntrar: {
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 20,
  },
  txtBtnEntrar: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnCad: {
    padding: 10,
    elevation: 5,
  },
  txtBtnCad: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxImgLogo: {
    alignItems: 'center',
  },
  imgLogo: {
    resizeMode: 'contain',
    width: '100%',
    height: 180,
    marginTop: 30,
    marginBottom: 30,
  },
  bkg: {
    flex: 1,
  },
});
