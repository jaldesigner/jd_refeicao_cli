import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';

export const BtnComandoCardapio = ({ prato, contaPrato, adiciona, retira }) => {
  return (
    <View style={aparencia.boxPrato}>

      <View style={{ flex: 2 }}>
        <Text style={{ color: '#4D0303' }}>{prato}</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={aparencia.boxComando}>
          <View style={{ flex: 1, alignItems: 'center' }}>

            <TouchableOpacity
              style={aparencia.btnComandoMenos}
              disabled={contaPrato == 0 ? true : false}
              onPress={() => retira()} >
              <Text style={{
                fontSize: 20,
                color: '#4D0303',
                fontWeight: "bold",
              }}>-</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: '#4D0303' }}>{contaPrato}</Text>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={aparencia.btnComandoMais}
              onPress={() => adiciona()}
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

const aparencia = StyleSheet.create({
  boxPrato: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#bbb',
    marginRight: 5,
    borderRadius: 5,
  },

  boxComando: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C23A0F',
    borderRadius: 10,
    width: '100%',
    padding:10,
  },

  btnComandoMenos: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderRightColor: '#C23A0F',
  },

  btnComandoMais: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderLeftColor: '#C23A0F',
    alignItems: 'center',
  }

});