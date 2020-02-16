import * as types from '../types';
import {createReducer} from '../../services/utilities';
import _ from 'lodash';

const initialState = {
    status: '',
    actionType: '',
    errorMessage: '',
    isFetching: false,
    students: [],
    student: {},
};

const updateStore = (state, newState) => ({
    ...state,
    ...newState,
});

const clearActionResult = (state, action) => {
    const {payload = {}} = action;

    let newState = {
        status: '',
        actionType: '',
        errorMessage: '',
        isFetching: false,
    };
    if (!_.isEmpty(payload)) newState = _.merge(newState, payload);

    return updateStore(state, newState);
};

const customRequest = (state, action) => {
    return updateStore(state, {
        status: '',
        actionType: '',
        errorMessage: '',
        isFetching: true,
    });
};

const getAllStudentsSuccess = (state, {payload}) => {
    return updateStore(state, {
        status: 'success',
        isFetching: false,
        students: payload,
    });
};

const getAllStudentsFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const getOneStudentSuccess = (state, {payload}) => {
    return updateStore(state, {
        status: 'success',
        isFetching: false,
        student: payload,
    });
};

const getOneStudentFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const createStudentSuccess = (state, {payload}) => {
    const updatedStudents = _.isEmpty(state.students) ? [] : [...state.students, payload];

    return updateStore(state, {
        status: 'success',
        actionType: 'new_student',
        isFetching: false,
        students: updatedStudents,
    });
};

const createStudentFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const updateStudentSuccess = (state, {payload}) => {
    const updatedStudents = state.students.map(st => {
        if (st._id === payload._id) return payload;
        return st;
    });

    return updateStore(state, {
        status: 'success',
        actionType: 'edit_student',
        isFetching: false,
        students: updatedStudents,
        student: payload,
    });
};

const updateStudentFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const deleteStudentSuccess = (state, {payload}) => {
    const updatedList = state.students.filter(st => st._id !== payload.id);

    return updateStore(state, {
        status: 'success',
        isFetching: false,
        students: updatedList,
    });
};

const deleteStudentFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

export const handlers = {
    [types.CLEAR_ACTION_RESULT_STUDENTS]: clearActionResult,

    [types.GET_ALL_STUDENTS_REQUEST]: customRequest,
    [types.GET_ALL_STUDENTS_SUCCESS]: getAllStudentsSuccess,
    [types.GET_ALL_STUDENTS_FAIL]: getAllStudentsFail,

    [types.GET_ONE_STUDENT_REQUEST]: customRequest,
    [types.GET_ONE_STUDENT_SUCCESS]: getOneStudentSuccess,
    [types.GET_ONE_STUDENT_FAIL]: getOneStudentFail,

    [types.CREATE_NEW_STUDENT_REQUEST]: customRequest,
    [types.CREATE_NEW_STUDENT_SUCCESS]: createStudentSuccess,
    [types.CREATE_NEW_STUDENT_FAIL]: createStudentFail,

    [types.UPDATE_STUDENT_REQUEST]: customRequest,
    [types.UPDATE_STUDENT_SUCCESS]: updateStudentSuccess,
    [types.UPDATE_STUDENT_FAIL]: updateStudentFail,

    [types.DELETE_STUDENT_REQUEST]: customRequest,
    [types.DELETE_STUDENT_SUCCESS]: deleteStudentSuccess,
    [types.DELETE_STUDENT_FAIL]: deleteStudentFail,
};

export default createReducer(initialState, handlers);