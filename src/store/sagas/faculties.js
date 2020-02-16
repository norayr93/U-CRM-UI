import {takeLatest, put} from 'redux-saga/effects';
import {
    GET_ALL_FACULTIES_REQUEST,
    CREATE_NEW_FACULTY_REQUEST,
    UPDATE_FACULTY_REQUEST,
    DELETE_FACULTY_REQUEST,
    GET_ONE_FACULTY_REQUEST,
} from '../types/faculties';
import {
    getAllFacultiesSuccess,
    getAllFacultiesFail,
    createNewFacultySuccess,
    createNewFacultyFail,
    updateFacultySuccess,
    updateFacultyFail,
    deleteFacultySuccess,
    deleteFacultyFail,
    getOneFacultySuccess,
    getOneFacultyFail} from '../actions';
import {BACKEND_URL} from '../../constants';
import {getRequestHeaders} from '../../services/helpers/fetch';
import AXIOS from '../../services/helpers/axios';

const baseUrlPath = `${BACKEND_URL}/faculties`;

function* getAllFaculties() {
    try {
        const urlPath = `${baseUrlPath}`;
        const configs = {
            headers: getRequestHeaders('get'),
        };

        const response = yield AXIOS.get(urlPath, configs);
        yield put(getAllFacultiesSuccess(response.data));
    } catch (e) {
        yield put(getAllFacultiesFail(encodeURI));
    }
}

function* getOneFaculty({payload: {facultyId}}) {
    try {
        const urlPath = `${baseUrlPath}/${facultyId}`;
        const configs = {
            headers: getRequestHeaders('get'),
        };

        const response = yield AXIOS.get(urlPath, configs);
        yield put(getOneFacultySuccess(response.data));
    } catch (e) {
        yield put(getOneFacultyFail(e));
    }
}

function* createNewFaculty({payload}) {
    try {
        const urlPath = `${baseUrlPath}`;
        const configs = {
            headers: getRequestHeaders('post'),
        };

        const data = JSON.stringify(payload);

        const response = yield AXIOS.post(urlPath, data, configs);
        yield put(createNewFacultySuccess(response.data));
    } catch (e) {
        yield put(createNewFacultyFail(e));
    }
}

function* updateFacultyData({payload: {_id, ...values}}) {
    try {
        const urlPath = `${baseUrlPath}/${_id}`;
        const configs = {
            headers: getRequestHeaders('put'),
        };

        const data = JSON.stringify(values);

        const response = yield AXIOS.put(urlPath, data, configs);
        yield put(updateFacultySuccess(response.data));
    } catch (e) {
        yield put(updateFacultyFail(e));
    }
}

function* deleteFaculty({payload: {facultyId}}) {
    try {
        const urlPath = `${baseUrlPath}/${facultyId}`;
        const configs = {
            headers: getRequestHeaders('delete'),
        };

        const response = yield AXIOS.delete(urlPath, configs);
        yield put(deleteFacultySuccess(response.data));
    } catch (e) {
        yield put(deleteFacultyFail(e));
    }
}

export default function* facultiesSaga() {
    yield takeLatest(GET_ALL_FACULTIES_REQUEST, getAllFaculties);
    yield takeLatest(GET_ONE_FACULTY_REQUEST, getOneFaculty);
    yield takeLatest(CREATE_NEW_FACULTY_REQUEST, createNewFaculty);
    yield takeLatest(UPDATE_FACULTY_REQUEST, updateFacultyData);
    yield takeLatest(DELETE_FACULTY_REQUEST, deleteFaculty);
}
