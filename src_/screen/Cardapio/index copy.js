import React, { useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import { Icon, Card, Input, Divider } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { PedidosContext } from '../../context';

const INF = DadosApp();
const PathDB = db().collection(INF.Categoria).doc(INF.ID_APP);

const Cardapio = ({ navigation }) => {

  const [Pedidos, setPedidos] = useContext(PedidosContext);
  const [arrayPratoDia, setArrayPratoDia] = useState([]);
  const [idPrato, setIdPrato] = useState('');
  const [idRadio, setIdRadio] = useState('');
  const [PratoRadio, setPratoRadio] = useState('');
  console.log(Pedidos)
  useEffect(() => {
    const pratoDia = () => {
      PathDB.collection('MontagemPratoDia')
        .doc(InfData)
        .collection('Montagens')
        .onSnapshot(snp => {
          setArrayPratoDia(snp.docs);
        })

    }
    pratoDia();
  }, []);
  //console.log(arrayPratoDia);

  const PratoSelecionado = () => {
    if (arrayPratoDia.length === 0) {
      return <ActivityIndicator color='#E33535' />
    } else {
      return (
        <View>
          <Text style={{ textAlign: 'center', color: '#CB7B03', fontSize: 18 }}>
            Prato selecionado:
                              </Text>
          <Text style={{ textAlign: 'center', color: '#E33535', fontSize: 20 }}>
            {PratoRadio == '' ? 'Nenhum' : PratoRadio + " com " + Pedidos.Acompanhamento}
          </Text>
        </View>
      );

    }

  };


  const BtnProximo = () => {
    if (arrayPratoDia.length == 0) {
      return (
        <View>
          <Text style={{ color: '#C23A0F', fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>
            O cardápio do dia ainda não foi publicado.
          </Text>
        </View>
      );
    } else if (idRadio == '') {
      return <View />
    } else {
      return (
        <TouchableOpacity style={styles.btnO} onPress={() => navigation.navigate('Acompanhamento')}>
          <Text style={styles.txtBtn}>Próximo</Text>
        </TouchableOpacity>
      );

    }
  };

  const ComboBoxOpcBox = () => {
    if (arrayPratoDia.length == 0 || arrayPratoDia.length == undefined) {

      return (
        <View />
      );

    } else {
      const cb = arrayPratoDia.map((item, index) => {
        return (
          <View key={index} style={styles.radioButtom}>
            <TouchableOpacity onPress={() => {

              setIdRadio(item.data().ID_PRATO);
              setPratoRadio(item.data().Nome_Prato);
              setPedidos({
                Prato: item.data().Nome_Prato,
                ID: item.data().ID_PRATO,
                Observacao: null,
                Acompanhamento: item.data().Nome_Acompanhamento,
              });
            }
            }

              style={styles.circuloRadio}>
              <View style={item.data().ID_PRATO == idRadio ? styles.circuloRDAtivo : null} />
            </TouchableOpacity>
            <Text style={styles.txt1}>
              {
                arrayPratoDia.length == 0 || arrayPratoDia.length == undefined
                  ? <ActivityIndicator color='#E33535' /> :
                  item.data().Nome_Prato +
                  " com " +
                  item.data().Nome_Acompanhamento
              }
            </Text>
          </View>
        );
      })
      return cb;
    }

    return null;

  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card title="Cardápio do dia" titleStyle={{ color: '#C23A0F', fontSize: 20 }}>
            <View>
              <Text style={{ textAlign: 'right', color: '#C23A0F' }}>Data: {InfData}</Text>
              <Divider />
            </View>
            <View>
              <ComboBoxOpcBox />
            </View>
          </Card>
          <Card>
            <PratoSelecionado />
          </Card>
          <Card>
            <View>
              <View>
                <BtnProximo />
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Cardapio;