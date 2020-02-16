/**
 * This is a wrapper for all AXIOS calls
 * We use axios as our light-weight XHR wrapper
 * [https://github.com/mzabriskie/axios]
 *
 * Usage:
 *    This file exports an instance of axios
 *    As such it includes the regular axios.get() | axios.put() | axios.post() and so on
 *        AXIOS.get() | AXIOS.put() | AXIOS.post()
 *    However, to do a generic axios call you must use AXIOS.request()
 *    All of these methods accept the standard axios config object
 *
 */

import axios from 'axios';
import _ from 'lodash';

import {BACKEND_URL, AUTH_LIST} from '../../constants';
import {StorageManager} from '../utilities';

const AXIOS = axios.create({
    baseURL: BACKEND_URL,
});

AXIOS.CancelToken = axios.CancelToken;

AXIOS.interceptors.response.use(result => {
    return result;
}, result => {
    const statusCode = _.get(result, ['response', 'status']);
    const message = _.get(result, ['response', 'data', 'error', 'message']);

    if (!result.response) {
        return;
    } else if (statusCode === 401 && message === 'Expired JWT Token') {
        StorageManager.remove('token');
        StorageManager.remove('logo');
        window.location.replace('/login');
    }

    return Promise.reject({
        type: 'error',
        status: result.response.status,
        message: result.response.message || message,
    });
});

export default AXIOS;
