import React, { useState, useEffect, useContext } from 'react';
import { Icon, Card, Input, Divider, Badge } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { MoedaReal } from '../../function';
import {PedidosContext} from '../../context';

const INF = DadosApp();

const Finalizacao = ({ navigation }) => {
  const [Pedidos, setPedidos] = useContext(PedidosContext);
  const [valorFinal, setValorFinal] = useState(14);
  const [ValorEmMaos, setValorEmMaos] = useState(0);
  const Troco = MoedaReal(ValorEmMaos - valorFinal);
  const Check = Troco.indexOf('-') !== -1 ? '0,00' : Troco;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card>
            <View>
              <Text style={{ color: '#C23A0F', fontSize: 24, textAlign: 'center' }}>
                Pedido encaminhado e sendo processado!
             </Text>
            </View>
            <Divider style={{marginTop: 20, marginBottom: 20}} />
            <View style={{ alignItems: 'center', }}>
              <View style={{
                borderStyle: 'solid',
                borderWidth: 6,
                borderColor: '#C23A0F',
                width: 220,
                height: 220,
                borderRadius: 110,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
                <Icon name="check" size={110} color="#34E43B" />
              </View>
            </View>
            <Divider style={{marginTop: 20, marginBottom: 20}} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  setPedidos([])
                  navigation.navigate('Home');
                }}

                style={styles.btnG}
              >
                <Text style={styles.txtBtn}>OK</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Finalizacao;