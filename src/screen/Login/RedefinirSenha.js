import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal,Button, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import firebase from '@react-native-firebase/app';
import { Icon, Card } from 'react-native-elements';


const auth = firebase.auth();

export default function RedefinirSenha({navigation}) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [load, setLoad] = useState(false);
  const [msgErro, setMsgErro] = useState('');

  function EnviaRedefinicaoDeSenha() {
    const Vazio = () =>{
      return (
        <View style={{ padding: 10, backgroundColor: '#FDC8C8', marginBottom: 20, elevation: 3, borderRadius: 5 }}>
          <Text style={{ color: "#4D0303", fontSize: 12, marginBottom: 10 }}>Digite a baixo o email que usou para fazer o cadastro em nosso App.</Text>
          <Text style={{ color: "#4D0303", fontSize: 12 }}>Ao clicar em "enviar", será submetido um email com um link de redefinição de senha</Text>
        </View>
      );
    };
    if (email != '') {
      auth.sendPasswordResetEmail(email).then(() => {
        setLoad(true);
        setTimeout(() => {
          setLoad(false);
          setMsg(true);
          setEmail('');
        }, 5000);

      }).catch(e => {

        switch (e.code) {
          case "auth/user-not-found":
            setMsgErro('Este email não existe em nosso sistema')
            break;
          case "auth/invalid-email":
            setMsgErro('Formato de email inválido!')
            break;

          default:
            console.log(e.code);
            break;
        }
      })
    } else {
      setMsgErro(`Digite a baixo o email que usou para fazer o cadastro em nosso App.\nAo clicar em "enviar", será submetido um email com um link de redefinição de senha`);
    }
  }

  function MsgErro() {
    if (msgErro != '') {
      return (
        <View style={{ padding: 10, backgroundColor: '#FDC8C8', marginBottom: 20, elevation: 3, borderRadius: 5 }}>
          <Text style={{ color: "#4D0303", fontSize: 12, marginBottom: 10 }}>{msgErro}</Text>
        </View>
      );
    }
    return null;
  }

  function RedefinicaoEnviada() {
    return (
      <ScrollView>
        <Card style={styles.modalMsg} >
        <Icon name="envelope" color="red" solid={false} size={50} type="font-awesome-5" />
          <Text style={{ color: "#4D0303", fontSize: 16, marginBottom: 10 }}>
            Entre em seu email e clique no link que lhe enviamos para redefinição da senha.
          </Text>
          <Text style={{ color: "#4D0303", fontSize: 16, marginBottom: 10 }}>
            Após redefinir sua senha, clique em fazer login e use a nova senha para entrar.
          </Text>
        </Card>
        <Card>
          <TouchableOpacity onPress={()=> {setMsg(''); navigation.navigate('Login',{auto:0})}}>
            <Text style={{color:'blue', textAlign:'center', fontWeight:'bold', fontSize:18}}>Fazer Login</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }

  function ExibeForm() {
    return (
      <ScrollView>
        <Card>
          <Card.Title h3Style={styles.titulo} h3={true}>
            <Icon name='key' color="#4D0303" type="font-awesome-5" />
            <Text>Redefinir senha</Text>
          </Card.Title>
          <Card.Divider />
          {MsgErro()}
          <Text style={styles.label}>Digite o email cadastrado</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Digite seu email"
            keyboardType='email-address'
            onChangeText={email => {setEmail(email);setMsgErro('')}}
            value={email}
          />
          <TouchableOpacity style={styles.btnEnviar} onPress={() => {
            EnviaRedefinicaoDeSenha();
          }}>
            {!load ? <Text style={styles.txtBtnEnviar}>Enviar</Text> : <ActivityIndicator animating={true} size="small" color="#fff" />}
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }
  return (
    <>
      {
        msg ? RedefinicaoEnviada() : ExibeForm()
      }
    </>
  )
}

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    color: '#4D0303',
  },
  label: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4D0303',
  },
  divisao: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  btnEnviar: {
    backgroundColor: "#FFAF00",
    padding: 10,
    borderRadius: 5,
    elevation: 5
  },
  txtBtnEnviar: {
    color: "#fff",
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 20,
    marginTop: 10,
  },
  modalMsg: {
    backgroundColor: "#EC0000",
    opacity: 0.9,
    flex: 1,
    padding: 20,
  },
});
