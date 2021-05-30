import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, Image, Button, ActivityIndicator, Modal } from 'react-native';
import NetInf from '@react-native-community/netinfo';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { styles } from '../../style';
import RedefinirSenha from './RedefinirSenha';

GoogleSignin.configure({
  webClientId: '142759402212-rb73qd22lnlooja0l9o17d5v36q08oql.apps.googleusercontent.com',
});

const aut = auth();

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [uid, setUid] = useState('');
  const [exibeSenha, setExibeSenha] = useState(true);
  //const net = NetInf.useNetInfo();
  const [conex, setConex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [infoUser, setInfoUser] = useState('');
  const [rsModal, setRsModal] = useState(false);


  useEffect(() => {
    const at = aut.onUserChanged((user) => {
      if (user) {
        setUid(auth().currentUser.uid);
        navigation.navigate("Cardapio", { auto: 0 });
      }

    });

    return () => {
      at();
    }

  }, [uid]);

  useEffect(() => {
    NetInf.fetch().then(state => {
      setConex(state);
      setLoading(conex.isConnected);
    });

    const unsubscribe = NetInf.addEventListener(state => {
      setConex(state);
    });

    return () => {
      unsubscribe();
    };

  }, [loading]);

  function VerificaConexao() {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    } else {

    }
    return null;
  }

  function RS() {
    return (
      <Modal animationType='slide' visible={rsModal} transparent={false}>
        <View>
          {/* <Image style={stl.imgLogo} source={require("../../img/logo.png")} /> */}
        </View>
        <RedefinirSenha />
       
      </Modal>
    );
  }

  function Teste() {
    if (!conex.isInternetReachable || !conex.isConnected) {
      return (
        <>
          <VerificaConexao />
          <Modal visible={loading} transparent={true}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, flex: 1, backgroundColor: '#800808', opacity: 0.9 }}>
              <View>
                <Text style={{ color: '#fff' }}>Aguarde...</Text>
                {/* <Text style={{ textAlign: 'center', fontSize: 20 }}>Verifique sua conexão com a internet!</Text> */}
                <ActivityIndicator animating={true} color="#fff" size="large" />
              </View>
            </View>
          </Modal>
        </>
      );
    } else {
      //setLoading(false);
      return null
    }
  }

  async function logar() {

    if (senha.trim() != '') {
      if (email.trim() != '') {
        try {
          await aut.signInWithEmailAndPassword(email, senha);
          setErro('');
          setSenha("");
          setEmail("");
          setExibeSenha(true);
          navigation.navigate('Cardapio', { auto: 0 });
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
      }

    } else {
      setErro("Entre com um email e senha válido!");
    }
  }

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

  // const signIn = async () => {
  //   try{
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(userInfo);
  //     const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
  //     console.log(credential)

  //     //firebase.auth().currentUser.linkWithCredential(credential);
  //     //await firebase.auth().signInWithCredential(credential);
  //   }catch(error){
  //     console.log(error)
  //   }

  // };

  return (
    <ImageBackground resizeMethod='resize' source={require("../../img/bkgEntrada.png")}
      blurRadius={3}
      opacity={1}
      style={stl.bkg}>
      <Teste />
      <RS />
      <ScrollView>
        <View style={stl.boxImgLogo} >
          <Image style={stl.imgLogo} source={require("../../img/logo.png")} />
          <Text style={{ fontSize: 26, color: '#fff', fontWeight: 'bold' }}>JD REFEIÇÕES</Text>
        </View>
        <View style={stlLogin.boxInput}>
          <MsgErro />
          <MsgSucesso />
          <View>
            <Input
              autoCapitalize='none'
              placeholder="Entre com seu e-mail"
              keyboardType='email-address'
              value={email.trim()}
              onChangeText={email => setEmail(email)}
              autoCompleteType='email'
              leftIcon={{ type: 'font-awesome', name: 'user', color: '#fff' }}
              leftIconContainerStyle={{
                backgroundColor: '#222',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                width: 50,
                height: 50,
              }}

              inputContainerStyle={{
                borderBottomWidth: 0,
              }}

              label="Email"
              labelStyle={{ color: '#fff', fontSize: 18, marginBottom: 5 }}
              inputStyle={{
                color: '#fff',
                backgroundColor: 'rgba(52, 52, 52, 0.5)',
                padding: 0,
                paddingLeft: 5,
                height: 50,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Input
                autoCapitalize='none'
                placeholder="Entre com sua senha"
                autoCompleteType='password'
                secureTextEntry={exibeSenha}
                value={senha}
                onChangeText={senha => setSenha(senha)}
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#fff' }}
                leftIconContainerStyle={{
                  backgroundColor: '#222',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  width: 50,
                  height: 50
                }}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                  margin: 0,
                  padding: 0,
                }}
                label="Senha"
                labelStyle={{ color: '#fff', fontSize: 18, marginBottom: 5 }}
                inputStyle={{
                  color: '#fff',
                  backgroundColor: 'rgba(52, 52, 52, 0.5)',
                  elevation: 2,
                  marginRight: 0,
                  padding: 0,
                  paddingLeft: 5,
                  height: 50,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}

              />
            </View>


          </View>
          <View style={{ position: 'relative', top: -15, }}>
            <TouchableOpacity onPress={() => exibeSenha ? setExibeSenha(false) : setExibeSenha(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >

              <Icon name={!exibeSenha ? "eye" : "eye-slash"} size={15} type="font-awesome-5" color="#fff" style=
                {{
                  backgroundColor: '#222',
                  borderRadius: 20,
                  margin: 10,
                  padding: 5,
                }} />
              <Text style={{ color: '#fff', fontSize: 14 }}>{exibeSenha ? 'Mostrar senha' : 'Esconder senha'}</Text>

            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 0, }}>
            <TouchableOpacity onPress={() => logar()} style={styles.btnY}>
              <Text style={stl.txtBtnEntrar}>Entrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.areaBtnHome}>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.btnLink}>Cadastrar-se</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RedefinirSenha',{auto:0})}>
              <Text style={styles.btnLink}>Recuperar senha</Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={()=>signIn()}
              disabled={false} /> */}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const stlLogin = StyleSheet.create({
  boxInput: {
    position: 'relative',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    //marginBottom: 30,
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
    flex: 1,
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
    height: 100,
    marginTop: 30,
    marginBottom: 10,
  },
  bkg: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
});
