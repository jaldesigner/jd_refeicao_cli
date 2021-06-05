import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import Route from './router';

import { PedidosContext, EnderecoContext, Editar } from './context';

const App = () => {
  const pedidos = useState([]);
  const endereco = useState([]);
  const Edit = useState('');

  // function VerificaConexao() {
  //   if (conex.isConnected && conex.isInternetReachable) {
  //     return null;
  //   } else {
  //     return (
  //       <View>
  //         <Text>Revise sua conexão com a internet!</Text>
  //       </View>
  //     );
  //   }
  // }


  return (
    <PedidosContext.Provider value={pedidos} >
      <EnderecoContext.Provider value={endereco} >
        <Editar.Provider value={Edit}>
          <Route />
        </Editar.Provider>
      </EnderecoContext.Provider>
    </PedidosContext.Provider>
  );
};

export default App;
