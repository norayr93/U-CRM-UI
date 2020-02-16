import {takeLatest, put} from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
} from '../types';
import {
    loginSuccess,
    loginFail,
} from '../actions';
import {BACKEND_URL} from '../../constants';
import {getRequestHeaders} from '../../services/helpers/fetch';
import AXIOS from '../../services/helpers/axios';

const baseUrlPath = `${BACKEND_URL}/auth`;

function* login({payload}) {
    try {
        const urlPath = `${baseUrlPath}/login`;
        const configs = {
            headers: getRequestHeaders('post'),
        };

        const data = JSON.stringify(payload);

        const response = yield AXIOS.post(urlPath, data, configs);
        yield put(loginSuccess(response.data));
    } catch (e) {
        yield put(loginFail(e));
    }
}

export default function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, login);
}
