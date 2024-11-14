import { rankingTypes } from '../types/ranking';
import { rankingService } from '../../api/ranking';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rankingInfos = {
  getRanking: getRanking,
  getRankingDetalhe: getRankingDetalhe
};

function getRanking() {
  return dispatch => {
    dispatch(request());

    rankingService.getRanking()
      .then(
        list => dispatch(success(list)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: rankingTypes.GET_RANKINGS_REQUEST } }
  function success(list) { return { type: rankingTypes.GET_RANKINGS_SUCCESS, list } }
  function failure(error) { return { type: rankingTypes.GET_RANKINGS_FAILURE, error } }
}

function getRankingDetalhe(idRanking) {
  return dispatch => {
    dispatch(request(idRanking));

    rankingService.getRankingDetalhe(idRanking)
      .then(
        info => dispatch(success(info)),
        error => dispatch(failure(idRanking, error.toString()))
      );
    };

  function request(idRanking) { return { type: rankingTypes.GET_RANKING_REQUEST, idRanking } }
  function success(info) { return { type: rankingTypes.GET_RANKING_SUCCESS, info } }
  function failure(error) { return { type: rankingTypes.GET_RANKING_FAILURE, error } }
}
