const data = new Date();
const mes = data.getMonth() + 1;
const dataFull = data.getDate() + '/' + mes + '/' + data.getFullYear();
export const InfData = dataFull;


const Config = () => {
  const DadosApp = {
    ID_APP: 'SUQ6IDEKRW1wcmVzYTogSkQgUmVmZWnDp8O1ZXMKUmVwcmVzZW50YW50ZTogSm9uYXMgQWx2ZXMgTHVjYXM=',
    Nome_App: 'JD Refeições',
    url_server: 'http://192.168.0.108/apprefeicao/',
  };
  return DadosApp;
};

export default Config;
