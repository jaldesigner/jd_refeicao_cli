import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import { Card, Divider } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp from '../../config';
import { PedidosContext } from '../../context';
import { BtnComandoCardapio } from '../../components/btnComandoCardapio';
import Seg from "../../config/seg";
import moment from 'moment';
import 'moment/locale/pt-br';

const HoraS = moment().format('LTS');
const InfData = moment().format('L');
const INF = DadosApp();
const PathDB = db().collection(INF.Categoria).doc(INF.ID_APP);

const Cardapio = ({ navigation }) => {
  Seg({ navigation });
  const [pedidos, setPedidos] = useContext(PedidosContext);
  const [ContaPratos, setContaPratos] = useState(pedidos.length);
  const [arrayPratoDia, setArrayPratoDia] = useState([]);
  const [ck2, setCk2] = useState();
  const [temPedidos, setTemPedidos] = useState([]);

  //console.log(auth().currentUser.providerData);

  useFocusEffect(React.useCallback(() => {
    //Cadastro 1
    PathDB.collection('PerfilUsuario')
      .orderBy('Completo')
      .onSnapshot(snp => {
        try {
          let Completo = snp.docs[0].data().Completo;
          if (!Completo) {
            setCk2(false);
            navigation.navigate('PosCadastro');
          }
        } catch (error) {
          setCk2(false);
          navigation.navigate('PosCadastro');
        }
      });

    if (ck2) {
      //Cadastro 2
      PathDB.collection('PerfilUsuario')
        .orderBy('Completo2')
        .onSnapshot(snp => {
          try {
            let Completo = snp.docs[0].data().Completo2;
            if (!Completo) {
              navigation.navigate('CadastroEndereco');
            }
          } catch (error) {
            navigation.navigate('CadastroEndereco');
          }

        });
    }

  }, []));

  useFocusEffect(React.useCallback(() => {
    setPedidos(pedidos);
  }, [pedidos]));

  const arrayPedidos = (array) => {
    const saida = [];
    for (const item of array) {
      saida.push(item.prato);
    }
    return saida;
  };

  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

  useFocusEffect(React.useCallback(() => {
    const pratoDia = PathDB.collection('CardapioDoDia')
      .where('Data', '==', InfData)
      .onSnapshot(snp => {
        setArrayPratoDia(snp.docs);
      })
  }, [])); //busca o cardápio do dia

  useFocusEffect(React.useCallback(() => {
    const ped = PathDB.collection('Pedidos')
      .where('Data_Pedido', '==', InfData)
      .where('ID_USER', '==', auth().currentUser.uid)
      .onSnapshot(snp => {
        setTemPedidos(snp.docs);
      });

    return () => ped();

  }, []));//Busca os pedidos

  const Cardapio = () => {
    const Lista = arrayPratoDia.map((item, index) => {
      const listaLP = item.data().Cardapio.map((listalp, indexLP) => {
        const acrescentaPedido = () => {
          pedidos.push({
            prato: listalp.prato,
            acompanhamento: listalp.acompanhamento,
            ContaPedidos: ContaPratos,
          });
          setContaPratos(pedidos.length);
          setPedidos(pedidos);
        };

        const retiraPedido = () => {
          var arr = arrayPedidos(pedidos).indexOf(listalp.prato);
          pedidos.splice(arr, 1);
          setContaPratos(pedidos.length);
          setPedidos(pedidos);
        };

        var acmp = listalp.acompanhamento == '' ? '' : '' + listalp.acompanhamento;
        //var acmp = acmp.replace(',', ' e ')

        //console.log(item.data().Cardapio[1]);

        if (item.data().Cardapio[indexLP].ativo == true) {
          return (
            <View key={indexLP}>
              <BtnComandoCardapio
                prato={listalp.prato}
                acomp={(acmp)}
                contaPrato={getOccurrence(arrayPedidos(pedidos), listalp.prato)}
                adiciona={acrescentaPedido}
                retira={retiraPedido} />
            </View>
          );
        }
      });
      return listaLP;
    });
    return Lista
  };

  const BtnProximo = () => {
    if (pedidos.length > 0) {
      return (
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity style={styles.btnY}
            onPress={() => navigation.navigate('Tamanho', { auto: 0 })}
          >
            <Text style={styles.txtBtn}>Próximo</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const SemMenu = () => {
    if (!arrayPratoDia.length) {
      return (
        <Card>
          <Text style={{ textAlign: 'center' }}>Não há cardápio</Text>
        </Card>
      );
    }
  }

  const ComMenu = () => {
    if (arrayPratoDia.length > 0) {
      return (
        <View>
          <Card>
            {Cardapio()}
            {BtnProximo()}
          </Card>
        </View>
      )
    };
  }

  const TemPedido = () => {
    if (temPedidos.length > 0) {
      return (
        <Card>
          <Card.Title>Informação</Card.Title>
          <Divider />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('PedidoFeito')}>
              <View>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: '#4D0303',
                }}>{temPedidos.length == 1 ? `Você tem ${temPedidos.length} pedido recente` : `Você tem ${temPedidos.length} pedidos recentes`}</Text>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#E33535',
                }}>Clique aqui para ver o andamento</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Title h3={true} h3Style={{color:"#4D0303"}}>Seja Bem vindo!</Card.Title>
        </Card>
      );
    }

    return null;

  }

  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderGeral tituloHead="Cardápio" />
        <TemPedido />
        {ComMenu()}
        <View>
          {SemMenu()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );


}

export default Cardapio;
