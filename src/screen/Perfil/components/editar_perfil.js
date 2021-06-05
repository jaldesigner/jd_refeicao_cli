import React,{useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Editar } from '../../../context';

const EditarPerfil = ({ navigation }) => {
  const [edit, setEdit] = useContext(Editar);
  return (
    <View>
      <Text>{edit}</Text>
    </View>
  )
}

export default EditarPerfil

const styles = StyleSheet.create({})
