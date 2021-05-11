import React, { useEffect, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Icon, Card, Divider } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp from '../../config';
import { PedidosContext, EnderecoContext } from '../../context';
import moment from 'moment';
moment.locale('pt-br');

const InfData = moment().format('L');

const INF = DadosApp();
const db = firestore();
const PathDB = db.collection(INF.Categoria).doc(INF.ID_APP);

const ModoPagamento = ({ navigation }) => {
  const [pedido, setPedido] = useContext(PedidosContext);
  const [S_Total, setS_Total] = useState('');
  const [Endereco, setEndereco] = useContext(EnderecoContext);
  const [horas, setHoras] = useState(moment().format('LTS'));
  const ID_pdd = (new Date()).valueOf().toString(32);

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

  const Finalizar = () => {

    pedido.ModoPagamento = "Cartão";

    const PedidosUser = {
      ID_pdd: ID_pdd,
      Data_Pedido: InfData,
      Hora_Pedido: horas,
      ID_USER: auth().currentUser.uid,
      Forma_de_Pagamento: "Cartão",
      Pedido: pedido,
      Total_Pagar: v,
      Endereco: Endereco,
      Execucao: false,
      Entrega: false,
    };

    PathDB
      .collection('Pedidos')
      .doc()
      .set(PedidosUser);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Finalizacao' }],
    });

  };// Função de finalização de pedido 

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', color: '#0254B5', fontSize: 25 }}>Cartão</Text>
              <Icon name="credit-card" type="font-awesome-5" size={150} solid={true} color="#0254B5" />
            </View>
            <Divider />
            <View style={{ padding: 10 }}>
              <Text style={{ color: '#4C0303', fontSize: 16, textAlign: 'center' }} >
                O Pagamento com cartão de crédito ou debito é feito no momento da entrega do pedido
              </Text>
            </View>
            <Divider />

            <View>
              <Text style={{ textAlign: 'center', color: '#4C0303', fontSize: 20, fontWeight: 'bold'}}>Total a pagar</Text>
              <Text style={{ textAlign: 'center', color: '#FF3D00', fontSize: 45, fontWeight: 'bold' }}>R${v}</Text>
            </View>

          </Card>
          <Card>
            <TouchableOpacity style={styles.btnG} onPress={()=> Finalizar()}>
              <Text style={styles.txtBtn}>Finalizar</Text>
            </TouchableOpacity>
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