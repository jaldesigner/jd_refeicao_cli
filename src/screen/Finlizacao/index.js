import React, { useState, useEffect, useContext } from 'react';
import { StackActions } from '@react-navigation/native';
import { Icon, Card, Input, Divider, Badge } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData, HoraS } from '../../config';
import { MoedaReal } from '../../function';
import { PedidosContext, EnderecoContext } from '../../context';

const INF = DadosApp();

const Finalizacao = ({ navigation }) => {
  const [Pedidos, setPedidos] = useContext(PedidosContext);
  const [Endereco, setEndereco] = useContext(EnderecoContext);

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
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
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
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'PedidoFeito' }],
                  }, setPedidos([]));
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