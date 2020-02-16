import * as types from '../types';
import {createReducer, StorageManager} from '../../services/utilities';
import _ from 'lodash';

const initialState = {
    status: '',
    isFetching: false,
};

const updateStore = (state, newState) => ({
    ...state,
    ...newState,
});

const clearActionResult = (state, action) => {
    const {payload = {}} = action;

    let newState = {
        status: '',
        isFetching: false,
    };
    if (!_.isEmpty(payload)) newState = _.merge(newState, payload);

    return updateStore(state, newState);
};

const customRequest = (state, action) => {
    return updateStore(state, {
        status: '',
        isFetching: true,
    });
};

const loginSuccess = (state, {payload}) => {
    StorageManager.set('token', payload.token);

    return updateStore(state, {
        status: 'success',
        isFetching: false,
    });
};

const loginFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
    });
};

export const handlers = {
    [types.CLEAR_ACTION_RESULT_LOGIN]: clearActionResult,
    [types.LOGIN_REQUEST]: customRequest,
    [types.LOGIN_SUCCESS]: loginSuccess,
    [types.LOGIN_FAIL]: loginFail,
};

export default createReducer(initialState, handlers);