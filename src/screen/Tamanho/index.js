import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Button} from 'react-native-elements';
import { ActivityIndicator, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import db, { firebase } from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { PedidosContext } from '../../context';

const INF = DadosApp();
const pathDB = db().collection(INF.Categoria).doc(INF.ID_APP);

const Tamanho = ({ navigation }) => {

  const [idRadio, setIdRadio] = useState(null);
  const [valores, setValores] = useState([]);

  const [pedidos, setPedidos] = useContext(PedidosContext);
  const [atuP, setAtuP] = useState(pedidos);
  const [atu, setAtu] = useState(0);
  const [comboAtivo, setComboAtivo] = useState(false);


  useEffect(() => {
    setPedidos(pedidos);
  }, [pedidos]);

  useEffect(() => {
    const exbValores = () => {
      const vlr = pathDB
        .collection('CardapioDoDia')
        .where('Data', '==', InfData)
        .onSnapshot(snp => {
          setValores(snp.docs);
        }, error => {
          console.log(`Erro ao listar os valores: ${error}`);
        })
    }
    exbValores();
    setAtu(0);
  }, [atu]);

  useEffect(() => {
    //console.log(pedidos.length);
    let arrayUndefined = [];

    pedidos.forEach(element => {
      arrayUndefined.push(element.Key);
    })

    let verifica = arrayUndefined.findIndex(fnd => fnd == undefined);

    if (verifica == -1) {
      setComboAtivo(true);
    }
    setAtu(0);
  }, [atu])

  const ListaPedidos = () => {
    const pdd = pedidos.map((prt, indexPrt) => {
      const valmed = valores.map((vm, indexVm) => {
        const card = vm.data().Cardapio.map((card, indexCard) => {
          if (prt.prato === card.prato) {
            const info = card.info.map((info, indexInfo) => {
              if (info.valor != null) {
                return (
                  <TouchableOpacity
                    key={indexInfo}
                    onPress={() => {
                      prt.Medida = info.medida;
                      prt.Valor = info.valor;
                      prt.Key = indexInfo;
                      setAtu(1);

                    }} >
                    <View style={prt.Key == indexInfo ? styles.radioButtomAtivo : styles.radioButtom} >
                      {/* <Text style={styles.txt1}>{info.medida + ' - R$' + info.valor}</Text> */}
                      <View style={{flex: 3}}>
                        <Text style={styles.txt1}>{info.medida}</Text>
                      </View>
                      <View style={{flex: 3}}>
                        <Text style={{color: '#C23A0F', textAlign:'center'}}>{'R$' + info.valor}</Text>
                      </View>
                      <View style={{flex: 3}}>
                        <View style={styles.circuloRadio}>
                          <View style={prt.Key == indexInfo ? styles.circuloRDAtivo : null} />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            });
            return info;
          }
        });
        return card;
      });

      return (
        <View key={indexPrt} style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#ddd', marginBottom: 20, }}>
          <Card.Title style={{
            color: '#800808',
            fontSize: 18,
            marginTop: 10,
            paddingLeft: 5,
            paddingRight: 5
          }}>
            {
              prt.acompanhamento == '' ? prt.prato : prt.prato + " com " + prt.acompanhamento
              /* {prt.prato} com {prt.acompanhamento} */
            }
          </Card.Title>
          <View>
            {valmed}
          </View>
        </View>
      )


    });
    return pdd;
  }
  const amostraBtn = () => {
    if (comboAtivo) {
      return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
          <View>
            <Button onPress={() => navigation.navigate('Cardapio')} title="Voltar" type="clear" />
          </View>
          <View>
            <TouchableOpacity style={styles.btnY} onPress={() => navigation.navigate('Detalhes', { auto: 0 })}>
              <Text style={styles.txtBtn}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>

      );
    }
  }

  return (

    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <Card>
          <Card.Title style={{ fontSize: 25, color: '#800808' }}>Opções</Card.Title>
          <Card.Divider />
          <View>
            {ListaPedidos()}
          </View>
        </Card>
        <Card>
          {
            amostraBtn()
          }
        </Card>
      </ScrollView>
    </SafeAreaView>

  );
}

export default Tamanho;