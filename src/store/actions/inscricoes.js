import { inscricoesTypes } from '../types/inscricoes';
import { preinscricoesTypes } from '../types/preinscricoes';
import { inscricoesService } from '../../api/inscricoes';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const inscricoesInfos = {
  getInscricoes: getInscricoes,
  getInscritos: getInscritos,
  getPreInscricoes: getPreInscricoes,
  getInscricaoDetalhe: getInscricaoDetalhe
};

function getInscricoes() {
  return dispatch => {
    dispatch(request());

    inscricoesService.getInscricoes()
      .then(
        list => dispatch(success(list)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: inscricoesTypes.GET_INSCRICOES_REQUEST } }
  function success(list) { return { type: inscricoesTypes.GET_INSCRICOES_SUCCESS, list } }
  function failure(error) { return { type: inscricoesTypes.GET_INSCRICOES_FAILURE, error } }
}

function getInscritos() {
  return dispatch => {
    dispatch(request());

    inscricoesService.getInscritos()
      .then(
        list => dispatch(success(list)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: inscricoesTypes.GET_INSCRITOS_REQUEST } }
  function success(list) { return { type: inscricoesTypes.GET_INSCRITOS_SUCCESS, list } }
  function failure(error) { return { type: inscricoesTypes.GET_INSCRITOS_FAILURE, error } }
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

function getInscricaoDetalhe(idInscricao) {
  return dispatch => {
    dispatch(request(idInscricao));

    inscricoesService.getInscricaoDetalhe(idInscricao)
      .then(
        info => dispatch(success(info)),
        error => dispatch(failure(idInscricao, error.toString()))
      );
    };

  function request(idInscricao) { return { type: inscricoesTypes.GET_INSCRICAO_REQUEST, idInscricao } }
  function success(info) { return { type: inscricoesTypes.GET_INSCRICAO_SUCCESS, info } }
  function failure(error) { return { type: inscricoesTypes.GET_INSCRICAO_FAILURE, error } }
}