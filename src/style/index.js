import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /*Conteiner da aplicação*/
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  /*Cor dos textos*/
  txt1: {
    color: '#C23A0F',
  },
  /*Item no centro*/
  itemCenter: {
    alignItems: 'center',
    marginTop: 20,
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
    alignItems: 'flex-end',
    flex: 1,
  },
  btnR: {
    elevation: 3,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#E33535',
  },
  btnO: {
    elevation: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#C23A0F',
  },
  btnY: {
    elevation: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFAF00',
  },
  btnG: {
    elevation: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    borderRadius: 10,
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
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },

  /* ------------------------ Header das telas internas ----------------------- */

  boxBarNav: {
    backgroundColor: '#4D0303',
    padding: 10,
    width: '100%',
    //justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  iconMenuL: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderStyle: 'solid',
    borderRightWidth:1,
    borderRightColor: '#800808',
    marginRight: 10,
  },
  txtTituloNav: {
    color: '#fff',
    fontSize: 20,
  },

  /* ------------------------------ Radio Buttom ------------------------------ */

  radioButtom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderTopWidth:1,
    borderStyle:'solid',
    borderColor:'#ddd',
    marginBottom:10,
    paddingTop: 10,
    paddingLeft:10,
  },
  radioButtomAtivo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderTopWidth:1,
    borderStyle:'solid',
    borderColor:'#ddd',
    paddingBottom:10,
    paddingTop: 10,
    paddingLeft:10,
    backgroundColor:'#FFE8B7',
  },
  circuloRadio: {
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    width: 20,
    height: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignSelf:'flex-end'
  },
  circuloRDAtivo: {
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    width: 15,
    height: 15,
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

