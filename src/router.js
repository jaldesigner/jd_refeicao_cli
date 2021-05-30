import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Import dos Screen
import Home from './screen/Home';
import Entrada from './screen/Entrada';
import Login from './screen/Login';
import Cadastro from './screen/Cadastro';
import PosCadastro from './screen/Cadastro/posCadastro';
import CadastroEndereco from './screen/Cadastro/cadastroEndereco';
import Cardapio from './screen/Cardapio';
import Acompanhamento from './screen/Acompanhamento';
import Detalhes from './screen/Detalhes';
import Endereco from './screen/Endereco';
import Tamanho from './screen/Tamanho';
import ModoPagamento from './screen/ModoPagamento';
import ModoDinheiro from './screen/ModoDinheiro';
import ModoCartao from './screen/ModoCartao';
import Finalizacao from './screen/Finlizacao';
import PedidoFeito from './screen/PedidoFeito';
import Configuracao from './screen/Configuracao';
import RedefinirSenha from './screen/Login/RedefinirSenha';
import {Navleft} from './components/menu';

const Drawer = createDrawerNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={ props => <Navleft nivel={2} {...props} />}
        initialRouteName="Login">
        <Drawer.Screen name="Entrada" component={Entrada}
          options={{ headerTransparent: true, title: false, headerLeft: null }} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="RedefinirSenha" component={RedefinirSenha}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="Cadastro" component={Cadastro}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
         <Drawer.Screen name="PosCadastro" component={PosCadastro}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="CadastroEndereco" component={CadastroEndereco}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="Cardapio" component={Cardapio}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="Acompanhamento" component={Acompanhamento}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="Tamanho" component={Tamanho}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="Detalhes" component={Detalhes}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="Endereco" component={Endereco}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="ModoPagamento" component={ModoPagamento}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="ModoDinheiro" component={ModoDinheiro}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="ModoCartao" component={ModoCartao}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="Finalizacao" component={Finalizacao}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="PedidoFeito" component={PedidoFeito}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen name="Configuracao" component={Configuracao}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Router;
