import React, { useEffect, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Icon, Card, Divider } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp from '../../config';
import { PedidosContext } from '../../context';

const INF = DadosApp();

const ModoPagamento = ({ navigation }) => {
  const [pedido, setPedido] = useContext(PedidosContext);
  const [S_Total, setS_Total] = useState('');

  const ContPedidos = pedido.length;

  const converteObjArray = (arrayObj) => {
    var saida = [];
    for (var cnv of arrayObj) {
      saida.push(parseInt(cnv.Valor.replace(',', '')));
    }
    return saida;
  };

  const somaValores = (arrayValores) => {
    if (arrayValores.length < 1) {
      navigation.navigate('Cardapio');
    } else {
      var total = arrayValores.reduce((total, numero) => {
        return total + numero;
      });
      return total;
    }
  };

  useEffect(() => {
    if (pedido.length != 0) {
      setS_Total(somaValores(converteObjArray(pedido)).toString());

    } else {
      setS_Total("0,00");
    }
  }, [S_Total])

  var v = S_Total.replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");

  useEffect(() => {
    setPedido(pedido);
  }, [pedido])

  const ListaPedidos = () => {
    const lp = pedido.map((pd, index) => {

      return (
        <View key={index}>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.txtChave}>Prato:</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.txtValor}>{pd.prato}</Text>
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
              <Text style={styles.txtValor}>R${pd.Valor}</Text>
            </View>
          </View>
          <Card.Divider />
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
            <View>
              <Text style={{ textAlign: 'center', color: '#4C0303', fontSize: 30, fontWeight: 'bold', textDecorationLine: 'underline' }}>Total</Text>
              <Text style={{ textAlign: 'center', color: '#FF3D00', fontSize: 35, fontWeight: 'bold' }}>R${v}</Text>
            </View>
            <Divider />
            <View style={{ padding: 10 }}>
              <Text style={{ color: '#4C0303', fontSize: 16 }} >Toque abaixo no metodo que deseja realizar o pagamento:</Text>
            </View>
            <Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity style={{ flex: 2, marginRight: 10 }}
                onPress={() => {
                  navigation.navigate('ModoDinheiro', { auto: 0 });
                }}
              >
                <View>
                  <Text style={{ textAlign: 'center', color: '#34E43B', fontSize: 25 }}>Dinheiro</Text>
                  <Icon name="money-bill-alt" type="font-awesome-5" size={90} solid={true} color="#34E43B" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 2, marginRight: 10 }}
                onPress={() => {
                  navigation.navigate('ModoCartao', { auto: 0 });
                }}
              >
                <View>
                  <Text style={{ textAlign: 'center', color: '#0254B5', fontSize: 25 }}>Cartão</Text>
                  <Icon name="credit-card" type="font-awesome-5" size={90} solid={true} color="#0254B5" />
                </View>
              </TouchableOpacity>

              <View>

              </View>
            </View>
          </Card>
        </View>
        {/* <View>
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
          <Card>
            <Card.Title style={{ color: '#C23A0F', fontSize: 20 }}>Forma de Pagameno</Card.Title>
            <TouchableOpacity style={styles.btnR} onPress={() => {
              navigation.navigate('ModoDinheiro', { auto: 0 });
            }}>
              <Text style={styles.txtBtn}>Dinheiro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnO}>
              <Text style={styles.txtBtn} onPress={() => {
                navigation.navigate('ModoCartao', { auto: 0 });
              }}>Cartão</Text>
            </TouchableOpacity>
          </Card>
        </View> */}
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