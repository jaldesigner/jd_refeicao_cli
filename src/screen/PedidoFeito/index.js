import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { HeaderGeral } from '../../components';
import db from '@react-native-firebase/firestore';
import { styles } from '../../style';
import DadosApp from '../../config';
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';
moment.locale('pt-br');

const InfData = moment().format('L');
const aut = auth();
const INF = DadosApp();
const PathDB = db().collection(INF.Categoria).doc(INF.ID_APP);

export default function PedidoFeito({ navigation }) {
  const [pedido, setPedido] = useState([]);
  const [dataTl, setDataTl] = useState([]);

  useFocusEffect(useCallback(() => {
    const ped = PathDB.collection('Pedidos')
      .where('Data_Pedido', '==', InfData)
      .where('ID_USER', '==', aut.currentUser.uid)
      .onSnapshot(snp => {
        setPedido(snp.docs);
      });

    return () => ped();

  }, [dataTl]));

  const Tmln = () => {
    const detalhePedidos = (idPedido) => {
      return (
        <>
          <TouchableOpacity onPress={() => alert("Próxima configuração\nAguarde...")}
            style={{}}
          >
            <Text style={{ color: '#34E43B', fontSize: 18 }}>Ver detalhes do pedido</Text>
          </TouchableOpacity>
        </>
      );
    };

    const listaPedido = pedido.map((item, index) => {
      let colorStateExecucao = item.data().Execucao == false ? '#ddd' : '#FFAF00';
      let colorStateExecucao2 = item.data().Execucao == false ? '#aaa' : '#800808';

      let colorStateEntrega = item.data().Entrega == false ? '#ddd' : '#FFAF00';
      let colorStateEntrega2 = item.data().Entrega == false ? '#aaa' : '#800808';

      dataTl[index] = [
        {
          title: item.data().Hora_Pedido + ' - ' + 'Pedido feito',
          description: detalhePedidos({ ...item.data() }),
        },
        {
          title: 'Pedido em execução',
          dotColor: colorStateExecucao2,
          circleColor: colorStateExecucao,
          titleStyle: {
            color: colorStateExecucao2,
            fontSize: 20
          },
          lineColor: colorStateExecucao2,
          circleSize: 20,
        },
        {
          title: 'Pedido enviado para você',
          dotColor: colorStateEntrega2,
          circleColor: colorStateEntrega,
          titleStyle: {
            color: colorStateEntrega2,
            fontSize: 20
          },
          circleSize: 20,
        },
      ]
    });

    return (
      <Timeline data={dataTl.flat(Infinity)}
        innerCircle={'dot'}
        circleSize={30}
        dotColor="#800808"
        circleColor="#FFAF00"
        lineColor="#FFAF00"
        titleStyle={{ color: '#800808', fontSize: 20 }}


        style={{
          marginTop: 10,
        }}
      />
    );
  };

  const DetalhePedido = () => {

  };

  return (
    <>
      <HeaderGeral />
      <View style={{ margin: 20 }}>
        <TouchableOpacity style={styles.btnG} onPress={() => { navigation.navigate('Cardapio') }}>
          <Text style={styles.txtBtn}>Novo Pedido</Text>
        </TouchableOpacity>

      </View>
      {/* <Tmln /> */}



      {/* Criação da TimeLine */}


      <View style={estlTML.boxTML}>
        <View style={estlTML.ttlInicial}>
          <View style={{ width: 30, backgroundColor: '#aaa' }}>
            <View style={estlTML.circ1} />
          </View>
          <View>
            <Text>Pedido Feito</Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{ backgroundColor: '#999', width: 30, alignItems:'center'}}>
            <View style={{width:2, backgroundColor:"#000", height:40}} />
          </View>
        </View>
        <View style={estlTML.ttlInicial}>
          <View style={{ width: 30, backgroundColor: '#aaa' }}>
            <View style={estlTML.circ1} />
          </View>
          <View>
            <Text>Pedido em execução</Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{ backgroundColor: '#999', width: 30, alignItems:'center'}}>
            <View style={{width:2, backgroundColor:"#000", height:40}} />
          </View>
        </View>
        <View style={estlTML.ttlInicial}>
          <View style={{ width: 30, backgroundColor: '#aaa' }}>
            <View style={estlTML.circ1} />
          </View>
          <View>
            <Text>Destinado a entrega</Text>
          </View>
        </View>
      </View>


      {/* Fim da Criação da TimeLine */}

    </>
  )
}

const estlTML = StyleSheet.create({
  boxTML: {
    backgroundColor: '#ddd',
    margin:16,
  },
  ttlInicial: {
    flexDirection: 'row',
  },
  circ1: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
  }
});
