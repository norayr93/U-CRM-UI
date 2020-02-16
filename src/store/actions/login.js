import {createAction} from 'redux-actions';
import * as types from '../types';

export const clearActionResultLogin = createAction(types.CLEAR_ACTION_RESULT_LOGIN);
export const logout = createAction(types.LOGOUT);

export const loginRequest = createAction(types.LOGIN_REQUEST);
export const loginSuccess = createAction(types.LOGIN_SUCCESS);
export const loginFail = createAction(types.LOGIN_FAIL);
