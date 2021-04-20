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

const PosCadastro = ({ navigation }) => {

  /* -------------------------------------------------------------------------- */
  /*                        Informações para o aplicativo                       */
  /* -------------------------------------------------------------------------- */
  const INF = CFG();

  /* -------------------------------------------------------------------------- */
  /*                         Banco de dados da Aplicação                        */
  /* -------------------------------------------------------------------------- */
  const aut = auth();
  const db = firestore();
  const PathDB = db.collection(INF.Categoria).doc(INF.ID_APP);

  /* -------------------------------------------------------------------------- */
  /*                            Estados da Aplicação                            */
  /* -------------------------------------------------------------------------- */
  const [nome, setNome] = useState('');
  const [numeroTel, setNumeroTel] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [Logado, setLogado] = useState(null);
  const [msgErro, setMsgErro] = useState('');

  /* -------------------------------------------------------------------------- */
  /*                             Arquivo de seurança                            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {

    aut.onUserChanged(v => {
      if (v) {
        setLogado(v.uid);
      } else {
        navigation.navigate('Login');
        //console.log('Não é pra vir aqui');
      }
    });

  }, []);

  //console.log(Logado);

  /* -------------------------------------------------------------------------- */
  /*                     Tratamento para o envio ao banco de dados                    */
  /* -------------------------------------------------------------------------- */

  const gravarDados = () => {
    if (nome === '' || nome.length <= 2) {
      setMsgErro("O campo nome deve conter 3 ou mais caracteres");
    } else if (numeroTel === '' || numeroTel.length <= 9) {
      setMsgErro('Número de telefone inválido.\nInforme o DDD e o número.');
    } else {
      const userDoc = PathDB.
        collection('PerfilUsuario').
        doc(aut.currentUser.uid).
        set({
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
    }

  }

  /* -------------------------------------------------------------------------- */
  /*                              Mensagem de erro                              */
  /* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */
  /*                                 Componentes                                */
  /* -------------------------------------------------------------------------- */

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card titleStyle={{ color: '#C23A0F', fontSize: 20 }} title="Dados Pessoais">
            <View>
              <MsgErro />
              <View>
                <Input
                  label="Nome/Vulgo"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="Nome do responsável pelo pedido"
                  onChangeText={nome => setNome(nome.trim())}
                  value={nome}
                />
              </View>
              <View>
                <Input
                  label="Número de telefone"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="(00) 000000000"
                  onChangeText={nome => setNumeroTel(nome.trim())}
                  value={numeroTel}
                />
              </View>
              <View>
                <Input
                  label="Data de nascimento"
                  labelStyle={{ color: '#C23A0F' }}
                  placeholder="00/00/0000"
                  onChangeText={nome => setDataNascimento(nome.trim())}
                  value={dataNascimento}
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