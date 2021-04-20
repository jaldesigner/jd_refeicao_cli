import React, { useState, useEffect, useContext } from 'react';
import { Icon, Card, Input, Divider, Badge } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { MoedaReal, maskDinheiro } from '../../function';
import {PedidosContext} from '../../context';

const idUser = () => auth().currentUser.uid;
const INF = DadosApp();
const db = firestore();
const PathDB = db.collection(INF.Categoria).doc(INF.ID_APP);
const ModoDinheiro = ({ navigation }) => {
  var [Pedidos, setPedidos] = useContext(PedidosContext);
  const [valorFinal] = useState(Pedidos.Preco);
  const [ValorEmMaos, setValorEmMaos] = useState('0,00');

  var emMaos = ValorEmMaos.replace(',', '.');
  var emMaos = emMaos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  var ValFinal = valorFinal.replace(',', '.');
  var ValFinal = ValFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  var n = ValFinal.replace('.', '');
  var n = n.replace(',', '');
  var n = parseInt(n);

  var nm = ValorEmMaos.replace(',', '');
  var nm = nm.replace('.', '');
  var nm = parseInt(nm);

  var tc = nm <= n ? '0' : nm - n;
  var troco = maskDinheiro(tc.toString());
  var troco = troco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  console.log([Pedidos]);

  const Finalizar = () => {
   //alert();

    Pedidos.Troco = troco;
    Pedidos.Usuario = idUser();
    Pedidos.ModoPagamento = "Dinheiro";

    const PedidosUser = Pedidos; 

    PathDB
      .collection('Pedidos')
      .doc(idUser())
      .collection(InfData)
      .doc()
      .set(PedidosUser);

    navigation.navigate('Finalizacao');

  };
  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card>
            <View style={{ alignItems: 'center', }}>
              <View style={{
                borderStyle: 'solid',
                borderWidth: 2,
                borderColor: '#CB7B03',
                width: 120,
                height: 120,
                borderRadius: 60,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
                <View style={{}}>
                  <Text style={{ color: '#E33535', fontSize: 20, fontWeight: 'bold', textAlign: 'center', }}>1</Text>
                </View>
                <Icon name="shopping-cart" size={50} color="#E33535" />
              </View>
            </View>
          </Card>
          <Card title="Dinheiro" titleStyle={{ color: '#C23A0F', fontSize: 30 }}>
            <View>
              <Input
                label="Diheiro em Mãos"
                placeholder="0,00"
                labelStyle={{ fontSize: 20, color: '#E33535', }}
                onChangeText={valor => setValorEmMaos(maskDinheiro(valor))}
                value={ValorEmMaos}
                maxLength={8}
                leftIcon={
                  nm >= n ?
                    { type: 'font-awesome-5', name: 'hand-holding-usd', color: '#34E43B' } :
                    { type: 'font-awesome-5', name: 'hand-holding-usd', color: '#E33535' }
                }
              />
            </View>
            <View>
              <Input
                label="Troco"
                placeholder="0,00"
                value={troco}
                labelStyle={{ fontSize: 20, color: '#E33535', }}
                disabled={true}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => Finalizar()}
                disabled={nm >= n ? false : true}
                style={nm >= n ? styles.btnG : styles.btnR}
              >
                <Text style={styles.txtBtn}>{nm >= n ? 'Finalizar' : 'Bloqueado'}</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <Card>
            <View>
              <Text style={{ textAlign: 'left', color: '#C23A0F', marginBottom: 10 }}>Data: {InfData}</Text>
              <Divider style={{ marginBottom: 10, }} />
            </View>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#CB7B03', fontSize: 18, marginRight: 10, }}>Prato:</Text>
                <Text style={{ color: '#E33535', fontSize: 18 }}>{Pedidos.Prato}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#CB7B03', fontSize: 18, marginRight: 10, }}>Tamanho:</Text>
                <Text style={{ color: '#E33535', fontSize: 18 }}>{Pedidos.Medida}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#CB7B03', fontSize: 18, marginRight: 10, }}>Valor:</Text>
                <Text style={{ color: '#E33535', fontSize: 18 }}>{Pedidos.Preco}</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ModoDinheiro;