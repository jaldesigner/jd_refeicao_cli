import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Route from './router';
import { PedidosContext } from './context';

const App = () => {

  const pedidos = useState([]);

  return (
    <PedidosContext.Provider value={pedidos} >
        <Route />
    </PedidosContext.Provider>
  );
};

export default App;
