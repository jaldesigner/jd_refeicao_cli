import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Import dos Screen
import Home from './screen/Home';
// import Entrada from './screen/Entrada';
// import Login from './screen/Login';
// import Cadastro from './screen/Cadastro';
// import PosCadastro from './screen/Cadastro/posCadastro';
// import CadastroEndereco from './screen/Cadastro/cadastroEndereco';
import Cardapio from './screen/Cardapio';
// import Acompanhamento from './screen/Acompanhamento';
// import Detalhes from './screen/Detalhes';
// import Endereco from './screen/Endereco';
// import Tamanho from './screen/Tamanho';
// import ModoPagamento from './screen/ModoPagamento';
// import ModoDinheiro from './screen/ModoDinheiro';
// import ModoCartao from './screen/ModoCartao';
// import Finalizacao from './screen/Finlizacao';
import {Navleft} from './components/menu';

const Drawer = createDrawerNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={ props => <Navleft nivel={2} {...props} />}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Cardapio" component={Cardapio} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Router;
