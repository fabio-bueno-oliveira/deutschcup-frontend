import { userTypes } from '../types/users';
import { userService } from '../../api/users';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const userInfos = {
    getInfo: getInfo
};

function getInfo() {
    return dispatch => {
        dispatch(request());

        userService.getInfo()
            .then(
                info => dispatch(success(info)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userTypes.GET_USER_INFO_REQUEST } }
    function success(info) { return { type: userTypes.GET_USER_INFO_SUCCESS, info } }
    function failure(error) { return { type: userTypes.GET_USER_INFO_FAILURE, error } }
}