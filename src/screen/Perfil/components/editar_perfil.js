import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Modal, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import { Icon, Input, Card } from 'react-native-elements';
import { Editar } from '../../../context';
import DadosApp from '../../../config';
import { HeaderGeral } from '../../../components';
import { styles } from '../../../style';
import { maskTel, maskCEP } from '../../../function/';

const DB = db().collection(DadosApp().Categoria).doc(DadosApp().ID_APP);

const EditarPerfil = ({ navigation }) => {
  const getUser = auth().currentUser == null ? "semId" : auth().currentUser;
  const uid = getUser.uid == undefined ? "semId" : getUser.uid;
  const [dadosUser, setDadosUser] = useState([]);
  const [edit, setEdit] = useContext(Editar);
  const [alt, setAlt] = useState(true);
  const [modal, setModal] = useState(true);
  const [modalSu, setModalSu] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                         Estados dos dados pessoais                         */
  /* -------------------------------------------------------------------------- */
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  /* -------------------------------------------------------------------------- */
  /*                        Estados dos dados do endereço                       */
  /* -------------------------------------------------------------------------- */
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    const subscriber = DB.collection('PerfilUsuario')
      .where('ID_USER', '==', uid)
      .onSnapshot(snp => {
        setDadosUser(snp.docs);
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setModal(false);
    }, 3000);
  }, []);

  const Mdl = () => {
    return (
      <Modal visible={modal} animationType="fade" transparent={false} >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
          <ActivityIndicator animating={true} color="red" size="large" />
          <Text>Aguarde...</Text>
        </View>
      </Modal>
    );
  }

  const AddDadosPessoais = ({ ...props }) => {

    if (nome == '' || nome.length < 3) {
      alert('O Campo Nome não pode ser vazio ou ter menos de 3 digitos');
    }
    else if (email == '' || email.length < 5) {
      alert('O Campo Email não pode ser vazio ou não pode ter menos de 5 digitos');
    }
    else if (telefone == '' || telefone.length < 10) {
      alert('O Campo Telefone não pode ser vazio ou não pode ter menos de 3 digitos');
    }
    else {
      if (props.Nome == nome && props.Telefone == telefone) {
        alert('Os valores não foram alterados\nDeseja deixar como está?')
      } else {
        try {

          DB.collection('PerfilUsuario')
            .where('ID_USER', '==', uid)
            .get().then(snp => {
              snp.docs.map(sn => {
                DB.collection('PerfilUsuario')
                  .doc(sn.id)
                  .update({
                    Nome: nome,
                    Email: email,
                    Telefone: telefone,
                  });
              });
            });

          setModalSu(true);

        } catch (error) {
          alert(error);
        }
      }
    }
  };

  const AddDadosEndereco = ({ ...props }) => {

    if (rua == '' || rua.length < 3) {
      alert('O Campo Rua não pode ser vazio ou ter menos de 3 digitos');
    }
    else if (numero == '') {
      alert('O Campo Número não pode ser vazio');
    }
    else if (bairro == '' || bairro.length < 3) {
      alert('O Campo Bairro não pode ser vazio ou não pode ter menos de 3 digitos');
    }
    else if (cidade == '' || cidade.length < 3) {
      alert('O Campo Cidade não pode ser vazio ou não pode ter menos de 3 digitos');
    }
    else {
      if (
        props.Rua == rua &&
        props.Numero == numero &&
        props.Complemento == complemento &&
        props.Cep == cep &&
        props.Bairro == bairro &&
        props.Cidade == cidade
      ) {
        alert('Os valores não foram alterados\nDeseja deixar como está?')
      } else {
        try {

          DB.collection('PerfilUsuario')
            .where('ID_USER', '==', uid)
            .get().then(snp => {
              snp.docs.map(sn => {
                DB.collection('PerfilUsuario')
                  .doc(sn.id)
                  .update({
                    Rua: rua,
                    Numero: numero,
                    Complemento: complemento,
                    Cep: cep,
                    Bairro: bairro,
                    Cidade: cidade,
                  });
              });
            });

          setModalSu(true);

        } catch (error) {
          alert(error);
        }
      }
    }
  };

  const EditDadosPessoais = () => {

    const dados = dadosUser.map((dd, index) => {
      let DD = dd.data();
      /* -------------------------------------------------------------------------- */
      /*                               Dados Pessoais                               */
      /* -------------------------------------------------------------------------- */
      let Nome = DD.Nome;
      let Email = DD.Email;
      let Telefone = maskTel(DD.Telefone);

      if (nome == '') {
        setNome(Nome);
      }
      if (email == '') {
        setEmail(Email);
      }
      if (telefone == '') {
        setTelefone(Telefone);
      }

      /* -------------------------------------------------------------------------- */
      /*                            Designer da aplicação                           */
      /* -------------------------------------------------------------------------- */

      //console.log(telefone);
      var telefoneM = maskTel(telefone);
      return (
        <View key={index}>
          <Card>
            <Card.Title h4={true} h4Style={{ color: '#4d0303' }}><Text>Edição de dados</Text></Card.Title>
            <Card.Divider />
            <View>
              <View>
                <Input
                  label="Nome"
                  keyboardType="ascii-capable"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Nome}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Nome}
                  onChangeText={Nome => { setNome(Nome); }}
                />
              </View>
              <View>
                <Input
                  keyboardType="email-address"
                  autoCapitalize="none"
                  disabled={true}
                  label="Email"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Email}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Email}
                  onChangeText={Email => { setEmail(Email); }}
                />
              </View>
              <View>
                <Input
                  keyboardType="phone-pad"
                  label="Telefone"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Telefone}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Telefone}
                  onChangeText={Telefone => { setTelefone(maskTel(Telefone)); }}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity disabled={false} onPress={() => AddDadosPessoais(DD)} style={styles.btnY}>
                <Text style={styles.txtBtn}>Editar</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      )
    });
    return dados;
  };

  const EditDadosEndereco = () => {
    const dados = dadosUser.map((dd, index) => {
      let DD = dd.data();
      /* -------------------------------------------------------------------------- */
      /*                             Endereço do usuário                            */
      /* -------------------------------------------------------------------------- */
      let Rua = DD.Rua;
      let Numero = DD.Numero;
      let Complemento = DD.Complemento;
      let Cep = maskCEP(DD.Cep);
      let Bairro = DD.Bairro;
      let Cidade = DD.Cidade;

      if (rua == '') {
        setRua(Rua);
      }
      if (numero == '') {
        setNumero(Numero);
      }
      if (bairro == '') {
        setBairro(Bairro);
      }
      if (cidade == '') {
        setCidade(Cidade);
      }
      /* -------------------------------------------------------------------------- */
      /*                            Designer da aplicação                           */
      /* -------------------------------------------------------------------------- */
      return (
        <View key={index}>
          <Card>
            <Card.Title h4={true} h4Style={{ color: '#4d0303' }}><Text>Edição de Endereço</Text></Card.Title>
            <Card.Divider />
            <View>
              <View>
                <Input
                  label="Rua:"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Rua}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Rua}
                  onChangeText={Rua => { setRua(Rua); }}
                />
              </View>
              <View>
                <Input
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  label="Número:"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Numero}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Numero}
                  onChangeText={Numero => { setNumero(Numero); }}
                />
              </View>
              <View>
                <Input
                  label="Complemento:"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Complemento}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Complemento}
                  onChangeText={Complemento => { setComplemento(Complemento) }}
                />
              </View>
              <View>
                <Input
                  keyboardType="numeric"
                  label="Cep:"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Cep}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Cep}
                  onChangeText={Cep => { setCep(maskCEP(Cep)); }}
                />
              </View>
              <View>
                <Input
                  label="Bairro:"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Bairro}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Bairro}
                  onChangeText={Bairro => { setBairro(Bairro); }}
                />
              </View>
              <View>
                <Input
                  label="Cidade:"
                  labelStyle={{ color: '#4d0303' }}
                  placeholder={Cidade}
                  placeholderTextColor="#3A3A3A"
                  defaultValue={Cidade}
                  onChangeText={Cidade => { setCidade(Cidade); }}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity disabled={false} onPress={() => AddDadosEndereco(DD)} style={styles.btnY}>
                <Text style={styles.txtBtn}>Editar</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      )
    });
    return dados;
  };

  const ModoEdicao = () => {
    switch (edit) {
      case 'DadosPessoais':
        return EditDadosPessoais();
        break;
      case 'DadosEndereco':
        return EditDadosEndereco();
        break;
    }
  };

  return (
    <>
      <Modal visible={modalSu} animationType="slide" transparent={true} >
        <View style={{
          backgroundColor: '#000000',
          opacity: 0.9,
          flex: 1,
        }}>

          <View style={{
            backgroundColor: '#ffffff',
            marginVertical: 60,
            marginHorizontal: 30,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: 20,
            elevation: 2,
          }}>
            <Icon name="check" type='font-awesome-5' color="#4d3" size={70} />
            <Text style={{
              textAlign: 'center',
              fontSize: 25,
              color: "#4d0303"
            }}>
              Dados alterados com sucesso!
            </Text>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalSu(false);
                  navigation.navigate('Perfil', { auto: 0 })
                }}
                style={styles.btnG}>
                <Text style={styles.txtBtn}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Mdl />
      <HeaderGeral />
      <ScrollView>
        {ModoEdicao()}
      </ScrollView>
    </>
  )
}

export default EditarPerfil
