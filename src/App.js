import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import Route from './router';

import { PedidosContext, EnderecoContext } from './context';

const App = () => {
  const pedidos = useState([]);
  const endereco = useState([]);

  function VerificaConexao() {
    if (conex.isConnected && conex.isInternetReachable) {
      return null;
    } else {
      return (
        <View>
          <Text>Revise sua conexão com a internet!</Text>
        </View>
      );
    }
  }


  return (
    <PedidosContext.Provider value={pedidos} >
      <EnderecoContext.Provider value={endereco} >
        <Route />
      </EnderecoContext.Provider>
    </PedidosContext.Provider>
  );
};

export default App;
