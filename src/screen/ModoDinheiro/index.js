import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Icon, Card, Input } from 'react-native-elements';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../../style';
import DadosApp from '../../config';
import { MoedaReal, maskDinheiro } from '../../function';
import { PedidosContext, EnderecoContext } from '../../context';
import moment from 'moment';
moment.locale('pt-br');

const InfData = moment().format('L');
// const Hora = moment().format('LT');
// var HoraS = moment().format('LTS');


const INF = DadosApp();
const db = firestore();
const PathDB = db.collection(INF.Categoria).doc(INF.ID_APP);

const ModoDinheiro = ({ navigation }) => {

  const [Pedidos, setPedidos] = useContext(PedidosContext);
  const [Endereco, setEndereco] = useContext(EnderecoContext);
  const [S_Total, setS_Total] = useState('');
  const [ValorEmMaos, setValorEmMaos] = useState('0,00');
  const [horas, setHoras] = useState(moment().format('LTS'))

  useEffect(() => {
    var getHora = 
      setInterval(() => {
        setHoras(moment().format('LTS'));
      }, 1000);
    
    return () => getHora;
  }, [horas])

  useFocusEffect(useCallback(() => {
    setPedidos(Pedidos);

  }, [Pedidos]));

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
    if (Pedidos.length != 0) {
      setS_Total(somaValores(converteObjArray(Pedidos)).toString());

    } else {
      setS_Total("0,00");
    }
  }, [S_Total])

  var v = S_Total.replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");

  const Total = v;

  var emMaos = ValorEmMaos.replace(',', '.');
  var emMaos = emMaos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  var ValFinal = Total.replace(',', '.');
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

  var ID_pdd = (new Date()).valueOf().toString(32);

  const Finalizar = () => {

    Pedidos.Troco = troco;
    Pedidos.ModoPagamento = "Dinheiro";

    const PedidosUser = {
      ID_pdd: ID_pdd,
      Data_Pedido: InfData,
      Hora_Pedido: horas,
      ID_USER: auth().currentUser.uid,
      Forma_de_Pagamento: "Dinheiro",
      Pedido: Pedidos,
      Total_Pagar: Total,
      Dinheiro_em_Maos: ValorEmMaos,
      Troco: troco,
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
                  <Text style={{ color: '#FF3D00', fontSize: 20, fontWeight: 'bold', textAlign: 'center', }}>{Pedidos.length}</Text>
                </View>
                <Icon name="shopping-cart" size={50} color="#FF3D00" />
              </View>
            </View>
          </Card>

          <Card>
          <Text style={{ textAlign: 'center', color: '#4C0303', fontSize: 30, fontWeight: 'bold', textDecorationLine: 'underline' }}>Total a pagar:</Text>
            <Text style={{ fontSize: 18, color: '#FF3D00', textAlign: 'center', fontWeight: 'bold', fontSize: 36 }}>{Total}</Text>
          </Card>

          <Card>
          <View style={{padding: 10}}>
            <Text style={{color:'#4C0303'}}>Digite o valor que tens em mãos para que possamos agilizar.</Text>
          </View>
            <View>
              <Input
                keyboardType="numeric"
                label="Diheiro em Mãos"
                placeholder="0,00"
                labelStyle={{ fontSize: 20, color: '#FF3D00', }}
                onChangeText={valor => {
                  setValorEmMaos(maskDinheiro(valor));
                }}
                value={ValorEmMaos}
                maxLength={8}
                leftIcon={
                  nm >= n ?
                    { type: 'font-awesome-5', name: 'hand-holding-usd', color: '#34E43B' } :
                    { type: 'font-awesome-5', name: 'hand-holding-usd', color: '#FF3D00' }
                }
              />
            </View>
            <View>
              <Input
                label="Troco"
                placeholder="0,00"
                value={troco}
                labelStyle={{ fontSize: 20, color: '#FF3D00', }}
                disabled={true}
              />
            </View>
            <View>
            <View style={{padding: 10, marginBottom:20}}>
              <Text style={{color:'#4C0303'}}>Para dar continuidade a compra, o valor digitado deverá ser igual ou maior ao valor total de compra.</Text>
            </View>
              <TouchableOpacity
                onPress={() => {
                  Finalizar();
                }}
                disabled={nm >= n ? false : true}
                style={nm >= n ? styles.btnG : styles.btnR}
              >
                <Text style={styles.txtBtn}>{nm >= n ? 'Finalizar' : 'Bloqueado'}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ModoDinheiro;
