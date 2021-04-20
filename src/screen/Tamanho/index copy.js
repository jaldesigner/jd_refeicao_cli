import React, { useState, useEffect, useContext } from 'react';
import { Card, Divider, } from 'react-native-elements';
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
  const [PratoRadio, setPratoRadio] = useState('');
  const [valores, setValores] = useState('');
  const [pedidos, setPedidos] = useContext(PedidosContext);

  useEffect(() => {
    const exbValores = () => {
      const vlr = pathDB
        .collection('CardapioDoDia')
        .where('Data', '==', InfData)
        //.where('ID_Prato_Dia', '==', pedidos.ID_PM)
        .onSnapshot(snp => {
          setValores(snp.docs);
        }, error => {
          console.log(`Erro ao listar os valores: ${error}`);
        })
    }
    exbValores();
  }, []);

  const ValoresMedidas = () => {

    if (valores.length === 0 || valores.length === undefined) {
      return (
        <ActivityIndicator size="large" animating={true} color="#C23A0F" />
      );
    } else {

      return (
        <>
          {
            valores.map((vm, index) => {
              const lstVM = vm.data().infoPrato;
              const lstPrato = vm.data();

              return (
                <View key={index}>
                  {
                    lstVM.map((medPrec, index) => {
                      return (
                        <View key={index} style={styles.radioButtom}>
                          <TouchableOpacity onPress={() => {
                            setIdRadio(medPrec.key);
                            setPratoRadio(lstPrato.NomePratoDoDia);
                            pedidos["Preco"] = medPrec.Valor;
                            pedidos["Medida"] = medPrec.Medida;
                          }} style={styles.circuloRadio}>
                            <View style={medPrec.key == idRadio && pedidos.Medida != undefined ? styles.circuloRDAtivo : null} />
                          </TouchableOpacity>
                          <Text style={styles.txt1}>{medPrec.Medida + ' - R$' + medPrec.Valor}</Text>
                        </View>
                      );
                    })
                  }
                </View>
              );
            })
          }
        </>
      );
    }

  };

  const amostraOpccao = () => {
    if (idRadio != null) {
      return (
        <View>
          <Card>
            <View>
              <Text style={{ textAlign: 'center', color: '#CB7B03', fontSize: 18 }}>
                Tamanho selecionado:
              </Text>
              <Text style={{ textAlign: 'center', color: '#E33535', fontSize: 20 }}>
                {pedidos.Medida == undefined ? ('Nenhum') : pedidos.Medida}
              </Text>
              <Text style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 30,
                backgroundColor: '#E33535',
                borderRadius: 10,
                marginTop: 10,
              }}>
                {pedidos.Preco == undefined ? 'Selecione...' : `R$${pedidos.Preco}`}
              </Text>
            </View>
          </Card>
        </View>
      );
    }
  }
  const amostraBtn = () => {
    if (idRadio != null) {
      return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
          <View>
            <TouchableOpacity style={styles.btnO}>
              <Text style={styles.txtBtn} onPress={() => navigation.navigate('Acompanhamento')}>Voltar</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.btnO} onPress={() => navigation.navigate('Detalhes')}>
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
        <View>
          <Card>
          <Card.Title style={{color: '#C23A0F', fontSize:25}}>Medidas</Card.Title>
            <View>
              <Text style={{
                textAlign: 'right',
                color: '#C23A0F',
                marginBottom: 10
              }}>Data: {InfData}</Text>
              <Card.Divider style={{ marginBottom: 10, }} />
            </View>
            <View>
              <Text style={{
                textAlign: 'center',
                color: '#CB7B03',
                fontSize: 18,
                marginBottom: 10,
              }}>Prato Celecionado: {pedidos.prato}</Text>
              <Divider style={{ marginBottom: 10, }} />
            </View>
            <ValoresMedidas />
          </Card>
          {
            amostraOpccao()
          }
          <Card>
            {
              amostraBtn()
            }
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Tamanho;