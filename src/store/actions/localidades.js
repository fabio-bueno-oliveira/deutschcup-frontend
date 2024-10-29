import { localidadesTypes } from '../types/localidades';
import { miscService } from '../../api/misc';

export const localidadesInfos = {
  getPaises: getPaises,
  getEstados: getEstados,
  getCidades: getCidades
};

function getPaises() {
  return dispatch => {
    dispatch(request());

    miscService.getPaises()
      .then(
        list => dispatch(success(list)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: localidadesTypes.GET_PAISES_REQUEST } }
  function success(list) { return { type: localidadesTypes.GET_PAISES_SUCCESS, list } }
  function failure(error) { return { type: localidadesTypes.GET_PAISES_FAILURE, error } }
}

function getEstados(paisId) {
  return dispatch => {
    dispatch(request(paisId));

    miscService.getEstados(paisId)
      .then(
        list => dispatch(success(list)),
        error => dispatch(failure(paisId, error.toString()))
      );
  };

  function request(paisId) { return { type: localidadesTypes.GET_ESTADOS_REQUEST, paisId } }
  function success(list) { return { type: localidadesTypes.GET_ESTADOS_SUCCESS, list } }
  function failure(paisId, error) { return { type: localidadesTypes.GET_ESTADOS_FAILURE, paisId, error } }
}

function getCidades(estadoId) {
  return dispatch => {
      dispatch(request(estadoId));

    miscService.getCidades(estadoId)
      .then(
        list => dispatch(success(list)),
        error => dispatch(failure(estadoId, error.toString()))
      );
  };

  function request(estadoId) { return { type: localidadesTypes.GET_CIDADES_REQUEST, estadoId } }
  function success(list) { return { type: localidadesTypes.GET_CIDADES_SUCCESS, list } }
  function failure(estadoId, error) { return { type: localidadesTypes.GET_CIDADES_FAILURE, estadoId, error } }
}