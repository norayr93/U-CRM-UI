import {takeLatest, put} from 'redux-saga/effects';
import {
    GET_ALL_GROUPS_REQUEST,
    CREATE_NEW_GROUP_REQUEST,
    UPDATE_GROUP_REQUEST,
    DELETE_GROUP_REQUEST,
    GET_ONE_GROUP_REQUEST,
} from '../types/groups';
import {
    getAllGroupsSuccess,
    getAllGroupsFail,
    createNewGroupSuccess,
    createNewGroupFail,
    updateGroupSuccess,
    updateGroupFail,
    deleteGroupSuccess,
    deleteGroupFail,
    getOneGroupSuccess,
    getOneGroupFail} from '../actions';
import {BACKEND_URL} from '../../constants';
import {getRequestHeaders} from '../../services/helpers/fetch';
import AXIOS from '../../services/helpers/axios';

const baseUrlPath = `${BACKEND_URL}/groups`;

function* getAllGroups() {
    try {
        const urlPath = `${baseUrlPath}`;
        const configs = {
            headers: getRequestHeaders('get'),
        };

        const response = yield AXIOS.get(urlPath, configs);
        yield put(getAllGroupsSuccess(response.data));
    } catch (e) {
        yield put(getAllGroupsFail(encodeURI));
    }
}

function* getOneGroup({payload: {groupId}}) {
    try {
        const urlPath = `${baseUrlPath}/${groupId}`;
        const configs = {
            headers: getRequestHeaders('get'),
        };

        const response = yield AXIOS.get(urlPath, configs);
        yield put(getOneGroupSuccess(response.data));
    } catch (e) {
        yield put(getOneGroupFail(e));
    }
}

function* createNewGroup({payload}) {
    try {
        const urlPath = `${baseUrlPath}`;
        const configs = {
            headers: getRequestHeaders('post'),
        };

        const data = JSON.stringify(payload);

        const response = yield AXIOS.post(urlPath, data, configs);
        yield put(createNewGroupSuccess(response.data));
    } catch (e) {
        yield put(createNewGroupFail(e));
    }
}

function* updateGroupData({payload: {_id, ...values}}) {
    try {
        const urlPath = `${baseUrlPath}/${_id}`;
        const configs = {
            headers: getRequestHeaders('put'),
        };

        const data = JSON.stringify(values);

        const response = yield AXIOS.put(urlPath, data, configs);
        yield put(updateGroupSuccess(response.data));
    } catch (e) {
        yield put(updateGroupFail(e));
    }
}

function* deleteGroup({payload: {groupId}}) {
    try {
        const urlPath = `${baseUrlPath}/${groupId}`;
        const configs = {
            headers: getRequestHeaders('delete'),
        };

        const response = yield AXIOS.delete(urlPath, configs);
        yield put(deleteGroupSuccess(response.data));
    } catch (e) {
        yield put(deleteGroupFail(e));
    }
}

export default function* groupsSaga() {
    yield takeLatest(GET_ALL_GROUPS_REQUEST, getAllGroups);
    yield takeLatest(GET_ONE_GROUP_REQUEST, getOneGroup);
    yield takeLatest(CREATE_NEW_GROUP_REQUEST, createNewGroup);
    yield takeLatest(UPDATE_GROUP_REQUEST, updateGroupData);
    yield takeLatest(DELETE_GROUP_REQUEST, deleteGroup);
}
