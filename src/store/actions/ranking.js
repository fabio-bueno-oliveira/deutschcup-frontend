import { rankingTypes } from '../types/ranking';
import { rankingService } from '../../api/ranking';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rankingInfos = {
  getRanking: getRanking
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
