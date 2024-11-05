import { configuracoesTypes } from '../types/configuracoes';
import { configuracoesService } from '../../api/configuracoes';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const configuracoesInfos = {
  getConfiguracoes: getConfiguracoes
};

function getConfiguracoes() {
  return dispatch => {
    dispatch(request());

    configuracoesService.getRanking()
      .then(
        list => dispatch(success(list)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: configuracoesTypes.GET_CONFIGURACOES_REQUEST } }
  function success(list) { return { type: configuracoesTypes.GET_CONFIGURACOES_SUCCESS, list } }
  function failure(error) { return { type: configuracoesTypes.GET_CONFIGURACOES_FAILURE, error } }
}
