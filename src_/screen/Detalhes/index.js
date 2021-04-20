import React, { useState, useEffect, useContext } from 'react';
import { Icon, Card, Input, Divider } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import {PedidosContext} from '../../context'
const INF = DadosApp();

const Detalhes = ({ navigation }) => {
  const [idRadio, setIdRadio] = useState('');
  const [PratoRadio, setPratoRadio] = useState('');
  const [Pratos] = useContext(PedidosContext);

  console.log(Pratos);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card title="Detalhes" titleStyle={{ color: '#C23A0F', fontSize: 20 }}>
            <View>
              <Text style={{ textAlign: 'right', color: '#C23A0F', marginBottom: 10 }}>Data: {InfData}</Text>
              <Divider style={{ marginBottom: 10, }} />
            </View>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#CB7B03', fontSize: 18, marginRight: 10, }}>Prato:</Text>
                <Text style={{ color: '#E33535', fontSize: 18 }}>{Pratos.Prato}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#CB7B03', fontSize: 18, marginRight: 10, }}>Tamanho:</Text>
                <Text style={{ color: '#E33535', fontSize: 18 }}>{Pratos.Medida}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#CB7B03', fontSize: 18, marginRight: 10, }}>Observação:</Text>
                <Text style={{ color: '#E33535', fontSize: 18 }}>{Pratos.Observacao == null?('Nenhuma'):Pratos.Observacao}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#CB7B03', fontSize: 18, marginRight: 10, }}>Valor:</Text>
  <Text style={{ color: '#E33535', fontSize: 18 }}>{Pratos.Preco}</Text>
              </View>
            </View>
          </Card>
          <Card>
            <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
              <View>
                <TouchableOpacity style={styles.btnO} onPress={() => { navigation.navigate('Endereco')}}>
                  <Text style={styles.txtBtn}>OK</Text>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity style={styles.btnY}>
                  <Text style={styles.txtBtn}>Fazer mais pedidos</Text>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity style={styles.btnY}>
                  <Text style={styles.txtBtn}>cancelar pedido</Text>
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