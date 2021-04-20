import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /*Conteiner da aplicação*/
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  /*Cor dos textos*/
  txt1: {
    color: '#C23A0F',
  },
  /*Item no centro*/
  itemCenter: {
    alignItems: 'center'
  },
  /*Imagem topo Home*/
  ImgTopHome: {
    resizeMode: 'cover',
    width: '100%',
    height: 150,
  },
  /*___Titulo do Header*/
  Headertxt: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 29,
    marginTop: 50,
  },
  /*Style da Logo*/
  ViewLogo: {
    alignItems: 'center',
    position: 'relative',
    top: -50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  areaBtnHome: {
    alignItems: 'center',
    flex: 1,
  },
  btnR: {
    elevation: 3,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#E33535',
  },
  btnO: {
    elevation: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#C23A0F',
  },
  btnY: {
    elevation: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#CB7B03',
  },
  btnG: {
    elevation: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#34E43B',
  },
  txtBtn: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  boxInputCadastro: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 30,
    alignItems: 'stretch',
    alignContent: 'space-between',
  },
  cmpInput: {
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  txtInput: {
    color: '#5C3938',
    fontSize: 18,
    marginLeft: 5,
  },
  btnLink: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
  },

  /* ------------------------ Header das telas internas ----------------------- */

  boxBarNav: {
    backgroundColor: '#4D0303',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  iconMenuL: {
    padding: 5,
  },
  txtTituloNav: {
    color: '#fff',
    fontSize: 20,
  },

  /* ------------------------------ Radio Buttom ------------------------------ */

  radioButtom: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    paddingTop:10,
  },
  circuloRadio: {
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    width: 30,
    height: 30,
    marginRight: 10,
    justifyContent: 'center',
  },
  circuloRDAtivo: {
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    width: 20,
    height: 20,
    backgroundColor: '#E33535',
    alignSelf: 'center',
  },
  msgErro: {
    backgroundColor: 'red', 
    padding: 5, 
    marginBottom: 20, 
    borderRadius: 10, 
    elevation: 5,
  },
  txtMsgErro:{
    color: '#fff', 
    fontSize: 14, 
    textAlign: 'center'
  },


  Burlet:{
    backgroundColor: '#C23A0F',
    width:10,
    height:10,
    elevation: 4,
    marginRight: 10,
    borderRadius: 5,
  },
  Burlet2:{
    backgroundColor: '#FFB6B6',
    width:10,
    height:10,
    elevation: 4,
    marginRight: 10,
    borderRadius: 5,
  },

  ItemRow:{
    paddingLeft: 10, 
    flexDirection:'row', 
    alignItems:'center',
  },
  Linha:{
    flex:1,
    width:'100%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  txtChave: {
    fontSize: 18,
    color: '#4D0303',
    fontWeight: 'bold',
  },
  txtValor: {
    fontSize: 18,
    color: '#E33535',
  },
});

