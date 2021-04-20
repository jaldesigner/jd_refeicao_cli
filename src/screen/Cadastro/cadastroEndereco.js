import React, { useState, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Icon, Card, Input } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import CFG from '../../config';
import { maskCEP } from '../../function';
import Seg from "../../config/seg";

const cadastroEndereco = ({ navigation }) => {
  Seg({navigation});

  /* -------------------------------------------------------------------------- */
  /*                        Informações para o aplicativo                       */
  /* -------------------------------------------------------------------------- */
  const INF = CFG();

  /* ----------------------------- db da aplicação ---------------------------- */
  const db = firestore();
  const PathDB = db.collection(INF.Categoria).doc(INF.ID_APP);

  /* ------------------------ autenticação da aplicação ----------------------- */
  const aut = auth();



  /* -------------------------------------------------------------------------- */
  /*                            Estados da Aplicação                            */
  /* -------------------------------------------------------------------------- */
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [Erro, setErro] = useState('');

  /* -------------------------------------------------------------------------- */
  /*                             Arquivo de seurança                            */
  /* -------------------------------------------------------------------------- */
  // useEffect(() => {

  //   aut.onUserChanged(v => {
  //     if (v) {
  //       setLogado(v.uid);
  //     } else {
  //       navigation.navigate('Login');
  //       //console.log('Não é pra vir aqui');
  //     }
  //   });

  // }, []);
  //console.log(aut.currentUser.uid);
  /* -------------------------------------------------------------------------- */
  /*                             Grava os endereços                             */
  /* -------------------------------------------------------------------------- */

  const GravarEndereco = () => {
    // if (rua == '') {
    //   setErro('Por favor, digite o nome de sua rua');
    // } else if (numero == '') {
    //   setErro('Digite o número de seu endereço');
    // } else if (bairro == '') {
    //   setErro('Digite seu bairro');
    // } else if (cidade == '') {
    //   setErro('Digite sua cidade');
    // } else {
      //if (auth().currentUser.uid = null) {
        PathDB
          .collection('PerfilUsuario')
          .doc(aut.currentUser.uid)
          .update({
            Rua: rua,
            Numero: numero,
            Complemento: complemento,
            Cep: cep,
            Bairro: bairro,
            Cidade: cidade,
            Completo2: true
          });

        alert('Endereço gravado com sucesso!');
        setRua('');
        setNumero('');
        setComplemento('');
        setCep('');
        setBairro('');
        setCidade('');
        setErro('');
        navigation.navigate('Cardapio');
      // } else {
      //   navigation.navigate('Login');
      // }

    //}
  };

  //console.log(Config().ID_APP);

  /* -------------------------------------------------------------------------- */
  /*                              Mensagem de erro                              */
  /* -------------------------------------------------------------------------- */
  const MensagemErro = () => {
    if (Erro != '') {
      return (
        <View style={styles.msgErro}>
          <Text style={styles.txtMsgErro}>{Erro}</Text>
        </View>
      );
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card>
            <Card.Title style={{ color: '#C23A0F', fontSize: 20 }}>Endereço</Card.Title>
            <View>
              <MensagemErro />
            </View>
            <View>
              <View>
                <Input
                  label="*Rua"
                  labelStyle={{ color: '#C23A0F' }}
                  onChangeText={rua => setRua(rua.trimStart())}
                  value={rua}
                  placeholder="Digite o nome de sua rua"
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '50%' }}>
                  <Input
                    keyboardType='numeric'
                    label="*Número"
                    labelStyle={{ color: '#C23A0F' }}
                    placeholder="Número do local"
                    onChangeText={numero => setNumero(numero.trimStart())}
                    value={numero}
                  />
                </View>
                <View style={{ width: '50%' }}>
                  <Input
                    label="Complemento"
                    labelStyle={{ color: '#C23A0F' }}
                    placeholder="exp.:casa 3"
                    onChangeText={complemento => setComplemento(complemento.trimStart())}
                    value={complemento}
                  />
                </View>
              </View>
              <View>
                <Input
                  keyboardType='numeric'
                  label="CEP"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="00000-000"
                  onChangeText={cep => setCep(cep.trimStart())}
                  value={maskCEP(cep)}
                />
              </View>
              <View>
                <Input
                  label="*Bairro"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="Nome de se bairro"
                  onChangeText={bairro => setBairro(bairro.trimStart())}
                  value={bairro}
                />
              </View>
              <View>
                <Input
                  label="*Cidade"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="Cidade onde você mora"
                  onChangeText={cidade => setCidade(cidade.trimStart())}
                  value={cidade}
                />
              </View>
            </View>
            <View style={styles.itemCenter}>
              <TouchableOpacity style={styles.btnO} onPress={() => GravarEndereco()}>
                <Text style={styles.txtBtn}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <Card>
            <View>
              <Text style={{ textAlign: 'center', color: '#E33535', fontSize: 14 }}>
                Os compos com '*' são obrigatórios.
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default cadastroEndereco;