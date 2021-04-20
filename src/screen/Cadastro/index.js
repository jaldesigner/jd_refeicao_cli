import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import { Button, SocialIcon, Overlay, Icon } from 'react-native-elements';
import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { HeaderLogin } from '../../components';
import {styles} from '../../style';

const aut = auth();

export default function Cadastro({ navigation }) {

  /* -------------------------------------------------------------------------- */
  /*                            Estados da aplicação                            */
  /* -------------------------------------------------------------------------- */
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [Rsenha, setRSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [MsgOverlay, setMsgOverlay] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                             Login com Facebook                             */
  /* -------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------- */
  /*                             Cadastro de usuário                            */
  /* -------------------------------------------------------------------------- */


  const CadastraUser = () => {

    if (email.trim() == '' || senha.trim() == '') {
      setErro('Preencha todos os campos!');
      setSucesso('');
    } else if (email.trim().length < 6 || senha.trim().length < 6) {
      setErro('Os campos devem contar acima de 6 caracteres');
      setSucesso('');
    } else if (senha.trim() !== Rsenha.trim()) {
      setErro('As senhas digitadas não são iguais');
      setSucesso('');
    } else {

      aut.createUserWithEmailAndPassword(email, senha).catch(e => {
        switch (e.code) {
          case 'auth/email-already-in-use':
            setErro('Email já cadastrado!\n faça o login');
            setSucesso('');
            break;
          case 'auth/invalid-email':
            setErro('Email inválido!');
            setSucesso('');
            break;
          default:
            //console.log(e.code);
            setSucesso('');
            break;
        }
      });
      //console.log(aut.onUserChanged);
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setEmail('');
          setSenha('');
          setRSenha('');
          setErro('');
          setMsgOverlay(true);
        } else {
          // Signed out
        }
      });
      return unsubscribe;
      //console.log(unsubscribe());
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                    Componente para as mensagem de erros                    */
  /* -------------------------------------------------------------------------- */

  const MsgErro = () => {
    if (erro !== '') {
      return (
        <View style={{ backgroundColor: 'red', padding: 5, marginBottom: 20, borderRadius: 10, elevation: 5, }}>
          <View><Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>{erro}</Text></View>
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

  //Botão OK Overlay
  const btnOk = () => {
    setMsgOverlay(false);
    setSucesso('');
    navigation.navigate('PosCadastro');
  }


  return (
    <ImageBackground source={require("../../img/bkgEntrada.png")}
      blurRadius={2}
      opacity={1}
      style={stl.bkg}>
      <Overlay isVisible={MsgOverlay}>
        <View style={stl.boxOverlay}>
          <Icon name='check' color='#33ff33' size={70} />
          <Text style={{
            textAlign: 'center',
            fontSize: 40,
            color: '#FF7A00',
          }}>Parabéns!</Text>
          <Text style={{
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20,
            color: '#5C3938',
          }}>Cadastro feio com sucesso!</Text>
          <Button title="Ok" onPress={() => btnOk()} />
        </View>
      </Overlay>
      <ScrollView>
        <Image style={stl.imgLogo} source={require("../../img/logo.png")} />
        <View style={stlLogin.boxInput}>
          <View>
            <MsgErro />
            <MsgSucesso />
          </View>
          <View>
            <Text style={stlLogin.txtInput}>Email</Text>
            <TextInput
              placeholder="Entre com seu e-mail"
              keyboardType='email-address'
              autoCompleteType='email'
              onChangeText={e => setEmail(e)}
              value={email}
              style={stlLogin.cmpInput}
            />
          </View>
          <View>
            <Text style={stlLogin.txtInput}>Senha</Text>
            <TextInput
              placeholder="Entre com sua senha"
              autoCompleteType='password'
              onChangeText={s => setSenha(s)}
              secureTextEntry={true}
              value={senha}
              style={stlLogin.cmpInput}
            />
          </View>
          <View style={{ marginBottom: 30, }}>
            <Text style={stlLogin.txtInput}>Repita a senha</Text>
            <TextInput
              placeholder="Repita a senha"
              onChangeText={RS => setRSenha(RS)}
              secureTextEntry={true}
              value={Rsenha}
              style={stlLogin.cmpInput}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => CadastraUser()} style={stl.btnEntrar}>
              <Text style={stl.txtBtnEntrar}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.areaBtnHome}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.btnLink}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

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
  boxOverlay: {

  },
});
