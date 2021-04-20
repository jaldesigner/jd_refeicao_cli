import React, { useState, useEffect, useContext } from 'react';
//import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import { Icon, Card, Input, Divider } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { PedidosContext } from '../../context';
import { BtnComandoCardapio } from '../../components/btnComandoCardapio';

const INF = DadosApp();
const PathDB = db().collection(INF.Categoria).doc(INF.ID_APP);

const Cardapio = ({ navigation }) => {
  const [pedidos, setPedidos] = useContext(PedidosContext);
  const [pratos, setPratos] = useState([]);
  const [ContaPratos, setContaPratos] = useState(pedidos.length);
  const [arrayPratoDia, setArrayPratoDia] = useState([]);

  /*
  ====================================================================
  */



  const a = [{ prato: "carne seca" }, { prato: "carne seca" }, { prato: "Bife" }, { prato: "Bife" }, { prato: "Bife" }, { prato: "Frango Assado" }];

  const pratoss = (array) => {
    const saida = [];
    for (const item of array) {
      saida.push(item.prato);
    }
    return saida; //retorna array com todos nomes de pratos pedidos como elementos
  };

  // const pratosUnique = (array) => {
  //   //recebe um array
  //   let saida = array.filter((p, index) => {
  //     return array.indexOf(p) == index;
  //   });
  //   return saida; //retorna valores sem repetições
  // };

  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count; //conta quantas vezes um valor aparece em um array
  }

  // const getValues = (all) => {
  //   const unique = pratosUnique(all);
  //   let saida = [];
  //   for (const item of unique) {
  //     saida.push({ prato: item, vezes: getOccurrence(all, item) });
  //   }
  //   console.log(saida);
  //   return saida; //retorna um array de objetos com nome do prato e quantas vezes ele foi pedido[{prato: "X", vezes: Y}]
  // };

  //getValues(pratoss(a)); 


  /*
  ====================================================================
  */




  useEffect(() => {
    const pratoDia = PathDB.collection('MontagemPratoDia')
      .doc(InfData)
      .collection('Montagens')
      .onSnapshot(snp => {
        setArrayPratoDia(snp.docs);
      })
  }, []);


  const verificaExistencia = (value) => {
    var index = pedidos.indexOf(value);

    if(index > -1){
      pedidos.splice(index, 1);
    }
  }

  const Cardapio = () => {
    //var p = pedidos;
    //var t = Object.values(p);
    //console.log(t);
    var objKey = Object.keys(pedidos)
    //console.log(objKey);
    const Lista = arrayPratoDia.map((item, index) => {

      const acrescentaPedido = () => {
        pedidos.push({
          prato: item.data().Nome_Prato,
        });
        setContaPratos(pedidos.length)
        console.log(pedidos);
      };

      const retiraPedido = () => {
        verificaExistencia(item.data().Nome_Prato);
        setContaPratos(pedidos.length)
        //console.log(pedidos);
      };

      return (
        <View key={index}>
          <BtnComandoCardapio
            prato={item.data().Nome_Prato + ' Com ' + item.data().Nome_Acompanhamento}
            contaPrato={getOccurrence(pratoss(pedidos), item.data().Nome_Prato)}
            adiciona={acrescentaPedido}
            retira={retiraPedido} />
        </View>
      );

    });
    return Lista
  };

  return (
    <SafeAreaView>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card title="Cardápio do dia" titleStyle={{ color: '#C23A0F', fontSize: 20 }}>
            {Cardapio()}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );


}

export default Cardapio;


const aparencia = StyleSheet.create({


});

/**
 * const Prato = () => {
    return (
      <View style={aparencia.boxPrato}>

        <View style={{ flex: 2 }}>
          <Text style={{ color: '#4D0303' }}>Carne Seca com  Abobora</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={aparencia.boxComando}>
            <View style={{ flex: 1, alignItems: 'center' }}>

              <TouchableOpacity
                style={aparencia.btnComandoMenos}
                disabled={pedidos.length == 0 ? true : false}
                onPress={() => retiraPedido()} >
                <Text style={{
                  fontSize: 20,
                  color: '#4D0303',
                  fontWeight: "bold",
                }}>-</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, color: '#4D0303' }}>{ContaPratos}</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity
                style={aparencia.btnComandoMais}
                onPress={() => acrescentaPedido()}
              >
                <Text style={{
                  fontSize: 20,
                  color: '#4D0303',
                  fontWeight: "bold",
                }}>+</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </View>
    );
  };
 */