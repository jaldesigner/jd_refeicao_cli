import React, { useState, useEffect, useContext } from 'react';
//import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert, Modal } from 'react-native';
import { Icon, Card, } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import DadosApp from '../../config';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderGeral } from '../../components';
import { Editar } from '../../context';

const DB = db().collection(DadosApp().Categoria).doc(DadosApp().ID_APP);

const Configuracao = ({ navigation }) => {

  const getUser = auth().currentUser == null ? "semId" : auth().currentUser;
  const uid = getUser.uid == undefined ? "semId" : getUser.uid;
  const [dadosUser, setDadosUser] = useState([]);
  const [auto, setAuto] = useState(0);
  const [edit, setEdit] = useContext(Editar);

  useEffect(() => {
    const subscriber = DB.collection('PerfilUsuario')
      .where('ID_USER', '==', uid)
      .onSnapshot(snp => {
        setDadosUser(snp.docs);
      });
    return () => subscriber();
  }, [auto]);

  const Header = () => {
    const dados = dadosUser.map((dd, index) => {
      let DD = dd.data();
      let Nome = DD.Nome;
      let Email = DD.Email;
      return (
        <View key={index}>
          <View style={styles.header}>
            <View style={styles.imgUser}>
              <Text style={styles.txtImgUser}>{Nome.substr(0, 1)}</Text>
            </View>
            <View>
              <Text style={styles.txtNomeUser}>{Nome}</Text>
            </View>
            <View>
              <Text style={styles.txtEmail}>{Email}</Text>
            </View>
          </View>
        </View>
      );
    });

    return dados;
  };

  const DadosPerfil = () => {

    const dados = dadosUser.map((dd, index) => {
      let DD = dd.data();
      /* -------------------------------------------------------------------------- */
      /*                               Dados Pessoais                               */
      /* -------------------------------------------------------------------------- */
      let Nome = DD.Nome;
      let Email = DD.Email;
      let Telefone = DD.Telefone;
      /* -------------------------------------------------------------------------- */
      /*                             Endereço do usuário                            */
      /* -------------------------------------------------------------------------- */
      let Rua = DD.Rua;
      let Numero = DD.Numero;
      let Cep = DD.Cep;
      let Bairro = DD.Bairro;
      let Cidade = DD.Cidade;
      /* -------------------------------------------------------------------------- */
      /*                            Designer da aplicação                           */
      /* -------------------------------------------------------------------------- */
      return (
        <View key={index} >
          <Card>
            <Card.Title h4={true}>Dados Pessoais</Card.Title>
            <Card.Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => { setEdit("DadosPessoais"); navigation.navigate('EditarPerfil') }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  elevation: 3,
                  backgroundColor: '#FFAF00',
                  borderRadius: 10
                }}>
                <Text style={{ marginRight: 10, color: '#ffffff' }}>Editar</Text>
                <Icon size={15} color="#ffffff" name="edit" type="font-awesome-5" />
              </TouchableOpacity>
            </View>
            <View>
              <Text>Nome/apelido:</Text>
              <Text>{Nome}</Text>
            </View>
            <View>
              <Text>Email:</Text>
              <Text>{Email}</Text>
            </View>
            <View>
              <Text>Telefone:</Text>
              <Text>{Telefone}</Text>
            </View>
          </Card>

          <Card>
            <Card.Title h4={true}>Endereço</Card.Title>
            <Card.Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => { setEdit("DadosEndereco"); navigation.navigate('EditarPerfil') }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  elevation: 3,
                  backgroundColor: '#FFAF00',
                  borderRadius: 10
                }}>
                <Text style={{ marginRight: 10, color: '#ffffff' }}>Editar</Text>
                <Icon size={15} color="#ffffff" name="edit" type="font-awesome-5" />
              </TouchableOpacity>
            </View>
            <View>
              <Text>Rua:</Text>
              <Text>{Rua}</Text>
            </View>
            <View>
              <Text>CEP:</Text>
              <Text>{Cep}</Text>
            </View>
            <View>
              <Text>Número:</Text>
              <Text>{Numero}</Text>
            </View>
            <View>
              <Text>Bairro:</Text>
              <Text>{Bairro}</Text>
            </View>
            <View>
              <Text>Cidade:</Text>
              <Text>{Cidade}</Text>
            </View>
          </Card>

        </View>
      );
    }
    );
    return dados;
  };

  return (
    <>
      <HeaderGeral />
      <ScrollView>
        <Header />
        <DadosPerfil />
      </ScrollView>
    </>
  )
}

export default Configuracao;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4D0303",
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  imgUser: {
    backgroundColor: '#FFAF00',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
  },
  txtImgUser: {
    color: '#4D0303',
    fontWeight: 'bold',
    fontSize: 22,
  },
  txtNomeUser: {
    color: '#fff',
    fontSize: 14,
  },
  txtEmail: {
    color: '#999',
    fontSize: 10
  },
  boxLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  boxIcon: {
    width: 50,
    marginBottom: 10,
  },
  icon: {
    color: '#4D0303',
  },
  txtLink: {
    color: '#C23A0F'
  }

});
