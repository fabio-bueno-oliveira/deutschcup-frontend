import { inscricoesTypes } from '../types/inscricoes';
import { preinscricoesTypes } from '../types/preinscricoes';
import { inscricoesService } from '../../api/inscricoes';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const userInfos = {
  getInscricoes: getInscricoes,
  getPreInscricoes: getPreInscricoes,
};

function getInscricoes() {
  return dispatch => {
    dispatch(request());

    inscricoesService.getInscricoes()
      .then(
        info => dispatch(success(info)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: inscricoesTypes.GET_INSCRICOES_REQUEST } }
  function success(info) { return { type: inscricoesTypes.GET_INSCRICOES_SUCCESS, info } }
  function failure(error) { return { type: inscricoesTypes.GET_INSCRICOES_FAILURE, error } }
}

function getPreInscricoes() {
  return dispatch => {
    dispatch(request());

    inscricoesService.getPreInscricoes()
      .then(
        info => dispatch(success(info)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: preinscricoesTypes.GET_PREINSCRICOES_REQUEST } }
  function success(info) { return { type: preinscricoesTypes.GET_PREINSCRICOES_SUCCESS, info } }
  function failure(error) { return { type: preinscricoesTypes.GET_PREINSCRICOES_FAILURE, error } }
}