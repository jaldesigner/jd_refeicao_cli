import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Card, Input } from 'react-native-elements';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import CFG from '../../config';
import { maskTel, maskData } from '../../function';
import Seg from "../../config/seg";

const PosCadastro = ({ navigation }) => {
  Seg({ navigation });
  const INF = CFG();
  const aut = auth();
  const db = firestore();
  const PathDB = db.collection(INF.Categoria).doc(INF.ID_APP);
  const [nome, setNome] = useState('');
  const [numeroTel, setNumeroTel] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [msgErro, setMsgErro] = useState('');

  const gravarDados = () => {
    if (nome === '' || nome.length <= 2) {
      setMsgErro("O campo nome deve conter 3 ou mais caracteres");
    } else if (numeroTel === '' || numeroTel.length <= 9) {
      setMsgErro('Número de telefone inválido.\nInforme o DDD e o número.');
    } else {
      if (aut.currentUser.uid != null) {
        const userDoc = PathDB.
          collection('PerfilUsuario').
          doc(aut.currentUser.uid).
          set({
            ID_USER: aut.currentUser.uid,
            ID_APP: INF.ID_APP,
            Nome: nome,
            Email: aut.currentUser.email,
            Telefone: numeroTel,
            DataNascimento: dataNascimento,
            Completo: true,
          });
        alert('Gravdo com sucesso!');
        setMsgErro('');
        setNome('');
        setDataNascimento('');
        setNumeroTel('');
        navigation.navigate('CadastroEndereco');
      } else {
        navigation.navigate('Login');
      }

    }

  }

  const MsgErro = () => {
    if (msgErro === '') {
      return null;
    } else {
      return (
        <View style={styles.msgErro}>
          <Text style={styles.txtMsgErro}>{msgErro}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card>
            <Card.Title style={{ color: '#C23A0F', fontSize: 20 }}>Dados Pessoais</Card.Title>
            <Card.Divider />
            <View>
              <MsgErro />
              <View>
                <Input
                  label="Nome/Vulgo"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="Nome do responsável pelo pedido"
                  onChangeText={valor => setNome(valor)}
                  value={nome}
                />
              </View>
              <View>
                <Input
                  label="Número de telefone"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="(00) 000000000"
                  onChangeText={valor => setNumeroTel(valor.trim())}
                  value={maskTel(numeroTel)}
                />
              </View>
              <View>
                <Input
                  keyboardType='numeric'
                  label="Data de nascimento"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="00/00/0000"
                  onChangeText={valor => setDataNascimento(valor.trim())}
                  value={maskData(dataNascimento)}
                />
              </View>
            </View>
            <View style={styles.itemCenter}>
              <TouchableOpacity onPress={() => gravarDados()} style={styles.btnO}>
                <Text style={styles.txtBtn}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <Card>
            <View>
              <Text style={styles.txt1}>Seus dados será somente para uso de nossos serviços.</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PosCadastro;