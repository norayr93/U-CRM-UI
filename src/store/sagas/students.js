import {takeLatest, put} from 'redux-saga/effects';
import _ from 'lodash';
import {
    GET_ALL_STUDENTS_REQUEST,
    CREATE_NEW_STUDENT_REQUEST,
    UPDATE_STUDENT_REQUEST,
    DELETE_STUDENT_REQUEST,
    GET_ONE_STUDENT_REQUEST,
} from '../types/students';
import {
    getAllStudentsSuccess,
    getAllStudentsFail,
    createNewStudentSuccess,
    createNewStudentFail,
    updateStudentSuccess,
    updateStudentFail,
    deleteStudentSuccess,
    deleteStudentFail,
    getOneStudentSuccess,
    getOneStudentFail} from '../actions';
import {BACKEND_URL} from '../../constants';
import {getRequestHeaders, buildUrl} from '../../services/helpers/fetch';
import AXIOS from '../../services/helpers/axios';

const baseUrlPath = `${BACKEND_URL}/students`;

function* getAllStudents({payload = {}} = {}) {
    try {
        let urlPath;
        const {queryParams} = payload;
        const configs = {
            headers: getRequestHeaders('get'),
        };

        if (_.isEmpty(queryParams)) {
            urlPath = baseUrlPath;
        } else {
            urlPath = buildUrl(baseUrlPath, queryParams);
        }

        const response = yield AXIOS.get(urlPath, configs);
        yield put(getAllStudentsSuccess(response.data));
    } catch (e) {
        yield put(getAllStudentsFail(e));
    }
}

function* getOneStudent({payload: {studentId}}) {
    try {
        const urlPath = `${baseUrlPath}/${studentId}`;
        const configs = {
            headers: getRequestHeaders('get'),
        };

        const response = yield AXIOS.get(urlPath, configs);
        yield put(getOneStudentSuccess(response.data));
    } catch (e) {
        yield put(getOneStudentFail(e));
    }
}

function* createNewStudent({payload}) {
    try {
        const urlPath = `${baseUrlPath}`;
        const configs = {
            headers: getRequestHeaders('post'),
        };

        const data = JSON.stringify(payload);

        const response = yield AXIOS.post(urlPath, data, configs);
        yield put(createNewStudentSuccess(response.data));
    } catch (e) {
        yield put(createNewStudentFail(e));
    }
}

function* updateStudentData({payload: {_id, ...values}}) {
    try {
        const urlPath = `${baseUrlPath}/${_id}`;
        const configs = {
            headers: getRequestHeaders('put'),
        };

        const data = JSON.stringify(values);

        const response = yield AXIOS.put(urlPath, data, configs);
        yield put(updateStudentSuccess(response.data));
    } catch (e) {
        yield put(updateStudentFail(e));
    }
}

function* deleteStudent({payload: {studentId}}) {
    try {
        const urlPath = `${baseUrlPath}/${studentId}`;
        const configs = {
            headers: getRequestHeaders('delete'),
        };

        const response = yield AXIOS.delete(urlPath, configs);
        yield put(deleteStudentSuccess(response.data));
    } catch (e) {
        yield put(deleteStudentFail(e));
    }
}

export default function* studentsSaga() {
    yield takeLatest(GET_ALL_STUDENTS_REQUEST, getAllStudents);
    yield takeLatest(GET_ONE_STUDENT_REQUEST, getOneStudent);
    yield takeLatest(CREATE_NEW_STUDENT_REQUEST, createNewStudent);
    yield takeLatest(UPDATE_STUDENT_REQUEST, updateStudentData);
    yield takeLatest(DELETE_STUDENT_REQUEST, deleteStudent);
}
