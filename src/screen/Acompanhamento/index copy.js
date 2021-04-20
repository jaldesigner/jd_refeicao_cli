import React, { useState, useEffect, useContext } from 'react';
import { Icon, Card, Input, Divider } from 'react-native-elements';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import Fieldset from 'react-native-fieldset';
import { HeaderGeral } from '../../components';
import { styles } from '../../style';
import DadosApp, { InfData } from '../../config';
import { PedidosContext} from '../../context';

const Acompanhamento = ({ navigation }) => {
  const INF = DadosApp();
  const PathDB = db().collection(INF.Categoria).doc(INF.ID_APP);
  const [acmpPrincipal, setAcmpPrincipal] = useState('');
  const [txtObs, setTxtObs] = useState();
  const [prato] = useContext(PedidosContext);

  useEffect(() => {
    const acmpPrincipal = () => {
      PathDB
        .collection('Acompanhamentos')
        .where('Principal', '==', true)
        .onSnapshot(snp => {
          setAcmpPrincipal(snp.docs[0].data().NomeAcompanhamento);
        })
    }
    acmpPrincipal();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGeral />
      <ScrollView>
        <View>
          <Card>
            <View>
              <Text style={{ textAlign: 'right', color: '#C23A0F' }}>Data: {InfData}</Text>
              <Divider />
            </View>
            <Fieldset
              label='Acompanhamentos'
              labelColor='#4D0303'
              labelStyle={{ fontWeight: 'bold' }} labelFontSize={20} borderColor='#C23A0F'>
              <View style={{ paddingTop: 10, paddingBottom: 10, }}>
                <Text style={{
                  color: '#C23A0F',
                  fontSize: 23,
                  fontWeight: 'bold'
                }}>{prato.Prato}</Text>
                <View>
                  <View style={styles.ItemRow}>
                    <View style={styles.Burlet} />
                    <Text style={{ color: '#CB7B03', fontSize: 18 }}>
                      {acmpPrincipal}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.ItemRow}>
                    <View style={styles.Burlet} />
                    <Text style={{ color: '#CB7B03', fontSize: 18 }}>
                      {prato.Acompanhamento}
                    </Text>
                  </View>
                </View>
                {/*<ListaAcompanhamento />*/}
                <View style={styles.Linha} />
              </View>
            </Fieldset>
            <View style={{ marginTop: 10, }}>
              <Fieldset
                label='Observações'
                labelColor='#4D0303'
                labelStyle={{ fontWeight: 'bold' }}
                labelFontSize={20}
                borderColor='#C23A0F'>
                <Input
                  multiline={true}
                  placeholder="Exp.: Sem Farofa"
                  style={{ borderWidth: 0 }}
                  underlineColorAndroid="transparent"
                  maxLength={140}

                  value={txtObs}
                  onChangeText={txt => {
                    setTxtObs(txt);
                    prato["Observacao"] = txt.length < 3 ? ('Não há Observação.') : txt;

                    setAcmp({
                      observ: txt,
                    });
                  }}
                />

              </Fieldset>
            </View>
          </Card>
          <Card>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
              <View>
                <TouchableOpacity style={styles.btnO} onPress={() => navigation.navigate('Cardapio')}>
                  <Text style={styles.txtBtn}>Voltar</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.btnO} onPress={() => navigation.navigate('Tamanho')}>
                  <Text style={styles.txtBtn}>Próximo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Acompanhamento;