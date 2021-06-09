import  moment from 'moment';
import 'moment/locale/pt-br';

export const InfData = moment().format('L');
export const Hora    = moment().format('LT');
export const HoraS   = moment().format('LTS');

const INF = () => {
  const DadosApp = {
    Categoria : 'Restaurante',
    ID_APP: 'SUQ6IDEKRW1wcmVzYTogSkQgUmVmZWnDp8O1ZXMKUmVwcmVzZW50YW50ZTogSm9uYXMgQWx2ZXMgTHVjYXM=',
    Nome_App: 'DART Delivery',
  };
  return DadosApp;
};

export default INF;
