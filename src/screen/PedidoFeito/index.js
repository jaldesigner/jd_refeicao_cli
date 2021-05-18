import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Icon, Card } from 'react-native-elements';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import auth from '@react-native-firebase/auth';
import { HeaderGeral } from '../../components';
import db from '@react-native-firebase/firestore';
import { styles } from '../../style';
import DadosApp from '../../config';
//import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';
moment.locale('pt-br');

const InfData = moment().format('L');
const aut = auth();
const INF = DadosApp();
const PathDB = db().collection(INF.Categoria).doc(INF.ID_APP);

export default function PedidoFeito({ navigation }) {
  const [pedido, setPedido] = useState([]);
  const [dataTl, setDataTl] = useState([]);
  const [modal, setModal] = useState(false);
  const [detalhe, setDetalhe] = useState([]);

  useFocusEffect(useCallback(() => {
    const ped = PathDB.collection('Pedidos')
      .where('Data_Pedido', '==', InfData)
      .where('ID_USER', '==', aut.currentUser.uid)
      .onSnapshot(snp => {
        setPedido(snp.docs);
      });

    return () => ped();

  }, [dataTl]));

  const detalhePedidos = (pdd) => {
    if (pdd.length == 0) {
      return null;
    } else if (pdd.length == undefined) {
      var contaPedidos = pdd.Pedido.length;

      let pd = pdd.Pedido.map((item, index) => {
        return (
          <View key={index}>
            <View style={estlTML.boxTxtM}>
              <Text style={estlTML.txtChave}>Pedido:</Text>
              <Text style={estlTML.txtValor}>{item.ContaPedidos + 1}</Text>
            </View>

            <View style={estlTML.boxTxtM}>
              <Text style={estlTML.txtChave}>Prato:</Text>
              <Text style={estlTML.txtValor}>{item.prato}</Text>
            </View>

            <View style={estlTML.boxTxtM}>
              <Text style={estlTML.txtChave}>Medida:</Text>
              <Text style={estlTML.txtValor}>{item.Medida}</Text>
            </View>

            <View style={estlTML.boxTxtM}>
              <Text style={estlTML.txtChave}>Valor:</Text>
              <Text style={estlTML.txtValor}>R${item.Valor}</Text>
            </View>
            {/* <Text>Prato: {item.prato}</Text>
            <Text>Medida: {item.Medida}</Text>
            <Text>Valor: {item.Valor}</Text> */}
            <View>
              {contaPedidos > 1 ? <Card.Divider style={{ marginTop: 10 }} /> : null}
            </View>
          </View>
        );
      });
      return pd;
    }
    //console.log();

  };

  const Tmln = () => {

    const listaPedido = pedido.map((item, index) => {
      let colorStateExecucao = item.data().Execucao == false ? '#ddd' : '#34E43B';
      let circuloExecucao = item.data().Execucao == false ? estlTML.circ2 : estlTML.circ1;

      let colorStateEntrega = item.data().Entrega == false ? '#ddd' : '#34E43B';
      let circuloEnterga = item.data().Entrega == false ? estlTML.circ2 : estlTML.circ1;
      let lineEntrega = item.data().Entrega == false ? estlTML.line2 : estlTML.line;


      return (
        <View key={index}>
          <Card>
            <Card.Title>
              <Text style={estlTML.txtTitulo}>Horário: {item.data().Hora_Pedido}</Text>
            </Card.Title>
            <Card.Divider />
            <View style={estlTML.boxTML}>
              <View style={estlTML.ttlInicial}>
                <View style={estlTML.boxCirculo}>
                  <View style={estlTML.circ1}>
                    <Icon color="#34E43B" size={18} name='check' type='font-awesome-5' />
                  </View>
                </View>
                <View>
                  <Text style={estlTML.txtAtivo}>Pedido Feito</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={estlTML.boxLine}>
                  <View style={estlTML.line} />
                </View>
              </View>
              <View style={estlTML.ttlInicial}>
                <View style={estlTML.boxCirculo}>
                  <View style={circuloExecucao}>
                    <Icon color={colorStateExecucao} size={18} name='check' type='font-awesome-5' />
                  </View>
                </View>
                <View>
                  <Text style={estlTML.txtAtivo}>Pedido em execução</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={estlTML.boxLine}>
                  <View style={lineEntrega} />
                </View>
              </View>
              <View style={estlTML.ttlInicial}>
                <View style={estlTML.boxCirculo}>
                  <View style={circuloEnterga}>
                    <Icon color={colorStateEntrega} size={18} name='check' type='font-awesome-5' />
                  </View>
                </View>
                <View>
                  <Text style={estlTML.txtAtivo}>Destinado a entrega</Text>
                </View>
              </View>
            </View>
            <Card.Divider style={{ marginTop: 10 }} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  setDetalhe(item.data());
                  setModal(true);
                }}
                style={{ alignItems: 'center' }}>
                <Text style={{ color: '#34E43B', fontSize: 14 }}>Ver detalhes do pedido</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      );
    });

    return listaPedido;

  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <View style={estlTML.boxModal}>
          <View>
            <TouchableOpacity onPress={() => {
              setDetalhe([]);
              setModal(false);
            }} style={estlTML.btnX}>
              <Text style={estlTML.txtBtnX}>X</Text>
            </TouchableOpacity>
          </View>
          <Card>
            <Card.Title><Text style={estlTML.txtTitulo}>Detalhe do Pedido</Text></Card.Title>
            <Card.Divider />
            {detalhePedidos(detalhe)}
          </Card>
        </View>
      </Modal>
      <HeaderGeral />
      <Card>
        <TouchableOpacity style={styles.btnG} onPress={() => { navigation.navigate('Cardapio') }}>
          <Text style={styles.txtBtn}>Novo Pedido</Text>
        </TouchableOpacity>

      </Card>
      <ScrollView>
        <Tmln />
      </ScrollView>
    </>
  )
}

const estlTML = StyleSheet.create({
  boxTML: {
  },
  boxCirculo: {
    width: 30,
  },
  boxLine: {
    width: 30,
    alignItems: 'center',
  },
  line: {
    width: 2,
    backgroundColor: "#FFB800",
    height: 40
  },
  line2: {
    width: 2,
    backgroundColor: "#ccc",
    height: 40
  },
  ttlInicial: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circ1: {
    borderWidth: 2,
    borderColor: '#FFB800',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circ2: {
    borderWidth: 2,
    borderColor: '#C4C4C4',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtAtivo: {
    color: '#4C0303',
    marginLeft: 10,
  },
  txtTitulo: {
    color: '#4C0303',
  },
  boxModal: {
    backgroundColor: '#000',
    opacity: 0.93,
    flex: 1,
    justifyContent: 'center',
  },
  btnX: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  txtBtnX: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxTxtM: {
    flexDirection: 'row',
  },
  txtChave: {
    color: "#4C0303",
    fontWeight: 'bold',
    marginBottom:10,
    flex:1,
  },
  txtValor: {
    color: "#FF5E00",
    flex:3
  },
});
