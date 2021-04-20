import React, { useState, useEffect, useContext } from 'react';
import { Icon, Card, Input, Divider, Badge } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { MoedaReal } from '../../function';
import { PedidosContext } from '../../context';

const INF = DadosApp();
const idUser = auth().currentUser.uid;
const PathDB = firestore().collection(INF.Categoria).doc(INF.ID_APP);

const ModoDinheiro = ({ navigation }) => {
  const [Pedidos] = useContext(PedidosContext);
  const [valorFinal, setValorFinal] = useState(14);
  const [ValorEmMaos, setValorEmMaos] = useState(0);
  const Troco = MoedaReal(ValorEmMaos - valorFinal);
  const Check = Troco.indexOf('-') !== -1 ? '0,00' : Troco;

  const Finalizar = () => {
    Pedidos.Usuario = idUser;
    Pedidos.ModoPagamento = "Cartão";

    PathDB
      .collection('Pedidos')
      .doc(idUser)
      .collection(InfData)
      .doc()
      .set(Pedidos);

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
          <Card title="Cartão" titleStyle={{ color: '#C23A0F', fontSize: 30 }}>
            <View>
              <Text style={{ color: '#C23A0F', fontSize: 18, textAlign: 'center' }}>
                O Pagamento será feito no momeno da entrega
                Clique emfinalizar que seu pedido será processado!
             </Text>
            </View>
            <Divider style={{ marginTop: 20, marginBottom: 20, }} />
            <View>
              <TouchableOpacity
                onPress={() => Finalizar()}
                style={styles.btnG}>
                <Text style={styles.txtBtn}>Finalizar</Text>
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