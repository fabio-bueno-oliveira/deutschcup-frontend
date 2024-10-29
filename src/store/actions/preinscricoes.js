import { preinscricoesTypes } from '../types/preinscricoes';
import { inscricoesService } from '../../api/preinscricoes';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const userInfos = {
  getPreinscricoes: getPreinscricoes
};

function getPreinscricoes() {
    return dispatch => {
        dispatch(request());

        inscricoesService.getPreinscricoes()
            .then(
                info => dispatch(success(info)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: preinscricoesTypes.GET_PREINSCRICOES_REQUEST } }
    function success(info) { return { type: preinscricoesTypes.GET_PREINSCRICOES_SUCCESS, info } }
    function failure(error) { return { type: preinscricoesTypes.GET_PREINSCRICOES_FAILURE, error } }
}