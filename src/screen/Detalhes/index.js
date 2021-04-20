import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Icon, Card, Input, Divider } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { PedidosContext } from '../../context'
import { TextInput } from 'react-native';
import { set } from 'react-native-reanimated';
import FieldSet from 'react-native-fieldset';
const INF = DadosApp();

const Detalhes = ({ navigation }) => {
  const [idRadio, setIdRadio] = useState('');
  const [PratoRadio, setPratoRadio] = useState('');
  const [observacao, setObservacao] = useState('');
  const [pedidos, setPedidos] = useContext(PedidosContext);

  useEffect(() => {
    setPedidos(pedidos);
  }, [pedidos])


  const ListaPedidos = () => {

    const mapa = pedidos.map((item, index) => {
      useEffect(() => {
        if (item.Observacao == undefined) {
          item["Observacao"] = "";
        }
      }, [])
      return (
        <View key={index}>
          <Card>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: '#4C0303', fontSize: 16, marginRight: 10, }}>Prato:</Text>
              <Text style={{ color: '#FF3D00', fontSize: 14 }}>{item.prato}</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: '#4C0303', fontSize: 16, marginRight: 10, }}>Acompanhamento:</Text>
              <Text style={{ color: '#FF3D00', fontSize: 14 }}>{item.acompanhamento}</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: '#4C0303', fontSize: 16, marginRight: 10, }}>Tamanho:</Text>
              <Text style={{ color: '#FF3D00', fontSize: 14 }}>{item.Medida}</Text>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: '#4C0303', fontSize: 16, marginRight: 10, }}>Valor:</Text>
              <Text style={{ color: '#FF3D00', fontSize: 14 }}>{item.Valor}</Text>
            </View>
            <View>
              <FieldSet label="Observação" borderColor="#4C0303" labelFontSize={20} labelColor="#4C0303" labelPosition="center" >
                <View>
                  <TextInput multiline={true}
                    style={{
                      padding: 5,
                      marginTop: 8
                    }} placeholder="Exp.: Sem farofa"
                    onChangeText={(T) => {
                      item["Observacao"] = T;
                      console.log(T);
                    }}

                  />
                </View>
              </FieldSet>
            </View>
          </Card>
        </View>
      );
    });
    return mapa;

  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <View>
            <Text style={{
              fontSize: 35,
              fontWeight: 'bold',
              textAlign: 'center',
              textDecorationLine:'underline',
              color:'#4C0303',
            }}>Detalhes</Text>
          </View>
          {ListaPedidos()}
          <Card>
            <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
              <View>
                <TouchableOpacity style={styles.btnY} onPress={() => {
                  navigation.navigate('Endereco', { auto: 0 })
                }}>
                  <Text style={styles.txtBtn}>OK</Text>
                </TouchableOpacity>
              </View>

            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Detalhes;
