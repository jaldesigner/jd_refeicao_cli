import React, { useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Card, Divider, Input } from 'react-native-elements';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import CFG from '../../config';
import { PedidosContext } from '../../context';
import { maskCEP } from '../../function';

const cadastroEndereco = ({ navigation }) => {
  const INF = CFG();
  const db = firestore();
  const PathDB = db.collection(INF.Categoria).doc(INF.ID_APP);
  const aut = auth();
  const [rua, setRua] = useState('');
  const [radioBox, setRadioBox] = useState(1);
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [Erro, setErro] = useState('');
  const [Logado, setLogado] = useState(null);
  const [infoPerfil, setInfoPerfil] = useState('');
  const [Pedido] = useContext(PedidosContext);
  const [pontoReferencia, setPontoReferencia] = useState('');
  const [execute, setExecute] = useState(0);

  //console.log(infoPerfil);

  useEffect(() => {

    aut.onUserChanged(v => {
      if (v) {
        return null;
      } else {
        navigation.navigate('Login');
      }
    });

  }, []);

  useEffect(() => {
    const GetEndereco = () => {
      PathDB.collection('PerfilUsuario')
        .doc(aut.currentUser.uid)
        .get()
        .then(snp => {
          setInfoPerfil(snp.data());
        })
    }
    GetEndereco();
  }, []);

  const GravarEndereco = () => {
    if (rua == '') {
      setErro('Por favor, o nome da rua');
    } else if (numero == '') {
      setErro('Digite o número de seu endereço');
    } else if (bairro == '') {
      setErro('Digite seu bairro');
    } else if (cidade == '') {
      setErro('Digite sua cidade');
    } else {

      const end = {
        Rua: rua,
        Numero: numero,
        Complemento: complemento,
        Cep: cep,
        Bairro: bairro,
        Cidade: cidade,
        PontoReferencia: pontoReferencia,
        Nome: infoPerfil.Nome,
      };

      Pedido.Endereco = null;
      Pedido['OutroEndereco'] = end;
      setExecute(1);
      setTimeout(() => {
        setExecute(0);
        navigation.navigate('ModoPagamento');
      }, 1000);
    }
  };

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

  const EnderecoCadastrado = () => {
    if (radioBox == 1) {
      return (
        <View>
          <Card>

            <View style={stylePage.boxEnderecoCad}>
              <View style={{ flex: 1 }}><Text style={stylePage.txtChave}>Rua:</Text></View>
              <View style={{ flex: 4 }}><Text style={stylePage.txtValor}>{`${infoPerfil.Rua}, ${infoPerfil.Numero}${infoPerfil.Complemento == "" ? `` : `, ${infoPerfil.Complemento}`}`}</Text></View>
            </View>

            <View style={stylePage.boxEnderecoCad}>
              <View style={{ flex: 1 }}><Text style={stylePage.txtChave}>Bairro:</Text></View>
              <View style={{ flex: 4 }}><Text style={stylePage.txtValor}>{infoPerfil.Bairro}</Text></View>
            </View>

            <View style={stylePage.boxEnderecoCad}>
              <View style={{ flex: 1 }}><Text style={stylePage.txtChave}>Cidade:</Text></View>
              <View style={{ flex: 4 }}><Text style={stylePage.txtValor}>{infoPerfil.Cidade}</Text></View>
            </View>

            <Divider />

            <View style={{ marginTop: 10 }}>
              <Text style={stylePage.txtChave}>Ponto de Referência</Text>
              <Input placeholder='Exp.: Bar do zé' multiline style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#ccc' }}
                onChangeText={txt => setPontoReferencia(txt.trimStart())}
                value={pontoReferencia}
              />
            </View>
            <View style={{ marginTop: 10, }}>
              <TouchableOpacity style={styles.btnO} onPress={() => {

                Pedido['PontoReferencia'] = pontoReferencia;
                Pedido['OutroEndereco'] = null;
                Pedido.Endereco = {
                  Rua: infoPerfil.Rua,
                  Numero: infoPerfil.Numero,
                  Complemento: infoPerfil.Complemento,
                  Cep: infoPerfil.Cep,
                  Bairro: infoPerfil.Bairro,
                  Cidade: infoPerfil.Cidade,
                  PontoReferencia: infoPerfil.PontoReferencia,
                  Nome: infoPerfil.Nome,
                };
                setExecute(1);
                setTimeout(() => {
                  setExecute(0);
                  navigation.navigate('ModoPagamento');
                }, 1000);

              }}>
                {
                  execute == 0 ? <Text style={styles.txtBtn}>Ok</Text> : <ActivityIndicator color="#fff" size="small" />
                }
              </TouchableOpacity>
            </View>
          </Card>

        </View>
      );
    }
    return null;
  }
  const OutroEndereco = () => {
    if (radioBox == 2) {
      return (
        <View>
          <Card titleStyle={{ color: '#C23A0F', fontSize: 20 }} title="Endereço">
            <View>
              <MensagemErro />
            </View>
            <View>
              <View>
                <Input
                  onChangeText={rua => setRua(rua.trimStart())}
                  value={rua}
                  placeholder="Digite o nome de sua rua"
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '50%' }}>
                  <Input
                    keyboardType='numeric'
                    placeholder="Número do local"
                    onChangeText={numero => setNumero(numero.trimStart())}
                    value={numero}
                  />
                </View>
                <View style={{ width: '50%' }}>
                  <Input
                    placeholder="exp.:casa 3"
                    onChangeText={complemento => setComplemento(complemento.trimStart())}
                    value={complemento}
                  />
                </View>
              </View>
              <View>
                <Input
                  keyboardType='numeric'
                  placeholder="00000-000"
                  onChangeText={cep => setCep(maskCEP(cep))}
                  value={cep}
                />
              </View>
              <View>
                <Input
                  placeholder="Nome de se bairro"
                  onChangeText={bairro => setBairro(bairro.trimStart())}
                  value={bairro}
                />
              </View>
              <View>
                <Input
                  placeholder="Cidade onde você mora"
                  onChangeText={cidade => setCidade(cidade.trimStart())}
                  value={cidade}
                />
              </View>

              <View>
                <Input
                  placeholder="Ponto de Referência"
                  onChangeText={pontoReferencia => setPontoReferencia(pontoReferencia.trimStart())}
                  value={pontoReferencia}
                />
              </View>

            </View>
            <View style={styles.itemCenter}>
              <TouchableOpacity style={styles.btnO} onPress={() => {
                Pedido['PontoReferencia'] = pontoReferencia;
                GravarEndereco();
              }}>
                {
                  execute == 0 ? <Text style={styles.txtBtn}>OK</Text> : <ActivityIndicator color="#fff" size="small" />
                }
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
      );
    }
    return null;
  };



  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card titleStyle={{ color: '#C23A0F', fontSize: 20 }} title="Local de entrega">

            <View style={stylePage.BoxCombo}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={stylePage.CirculoExterno} onPress={() => {
                  setRadioBox(1);
                }}>
                  <View style={radioBox == 1 ? stylePage.CirculoInterno : null} />
                </TouchableOpacity>
              </View>
              <View style={stylePage.BoxText}>
                <Text style={stylePage.TextCombo}>Endereço cadastrado</Text>
              </View>
            </View>
            <View style={stylePage.BoxCombo}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={stylePage.CirculoExterno} onPress={() => {
                  setRadioBox(2);
                }}>
                  <View style={radioBox == 2 ? stylePage.CirculoInterno : null} />
                </TouchableOpacity>
              </View>
              <View style={stylePage.BoxText}>
                <Text style={stylePage.TextCombo}>Outro endereço</Text>
              </View>
            </View>
          </Card>
          {EnderecoCadastrado()}
          {OutroEndereco()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default cadastroEndereco;

const stylePage = StyleSheet.create({
  BoxCombo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  CirculoExterno: {
    borderWidth: 1,
    borderColor: '#4D0303',
    borderStyle: 'solid',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CirculoInterno: {
    backgroundColor: '#4D0303',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  BoxText: {
    flex: 7,
    justifyContent: 'center',
  },
  TextCombo: {
    color: '#E33535'
  },

  boxEnderecoCad: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  txtChave: {
    color: '#4D0303',
    fontWeight: 'bold',
  },
  txtValor: {
    color: '#E33535',
  },

});
