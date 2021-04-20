import React, { useState, useEffect, useContext } from 'react';
import { Icon, Card, Divider } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { PedidosContext } from '../../context';

const INF = DadosApp();

const ModoPagamento = ({ navigation }) => {
  const [idRadio, setIdRadio] = useState('');
  const [PratoRadio, setPratoRadio] = useState('');
  const [pedido] = useContext(PedidosContext);
  const Pedidos = [pedido];
  const ContPedidos = Pedidos.length;
  console.log(pedido);
  const ListaPedidos = () => {
    const lp = Pedidos.map((pd, index) => {

      return (
        <View key={index}>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.txtChave}>Prato:</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.txtValor}>{pd.Prato}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.txtChave}>Tamanho:</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.txtValor}>{pd.Medida}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.txtChave}>Valor:</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.txtValor}>R${pd.Preco}</Text>
            </View>
          </View>

        </View>
      );
    });
    return lp;
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card>
            <View style={{ alignItems: 'center', }}>
              <View style={stylePage.CirculoCard}>
                <View>
                  <Text style={stylePage.TxtNumeroPedido}>{ContPedidos}</Text>
                </View>
                <Icon name="shopping-cart" size={50} color="#E33535" />
              </View>
            </View>
          </Card>
          <Card title="Modo de Pagameno" titleStyle={{ color: '#C23A0F', fontSize: 20 }}>
            <TouchableOpacity style={styles.btnR} onPress={() => {
              navigation.navigate('ModoDinheiro');
            }}>
              <Text style={styles.txtBtn}>Dinheiro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnO}>
              <Text style={styles.txtBtn} onPress={() => {
                navigation.navigate('ModoCartao');
              }}>Cartão</Text>
            </TouchableOpacity>
          </Card>
          <Card>
            <View>
              <Text style={styles.txtValor}>Data: {InfData}</Text>
              <Divider style={{ marginBottom: 10, }} />
            </View>
            {
              ListaPedidos()
            }

          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ModoPagamento;

const stylePage = StyleSheet.create({
  CirculoCard: {
    elevation: 15,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#CB7B03',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignContent: 'center',
  },
  TxtNumeroPedido: {
    color: '#E33535',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});