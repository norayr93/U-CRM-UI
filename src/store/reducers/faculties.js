import * as types from '../types';
import {createReducer} from '../../services/utilities';
import _ from 'lodash';

const initialState = {
    status: '',
    actionType: '',
    errorMessage: '',
    isFetching: false,
    faculties: [],
    faculty: {},
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

const getAllFacultiesSuccess = (state, {payload}) => {
    return updateStore(state, {
        status: 'success',
        actionType: '',
        isFetching: false,
        faculties: payload,
    });
};

const getAllFacultiesFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        actionType: '',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const getOneFacultySuccess = (state, {payload}) => {
    return updateStore(state, {
        status: 'success',
        isFetching: false,
        faculty: payload,
    });
};

const getOneFacultyFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const createFacultySuccess = (state, {payload}) => {
    const updatedFaculties = _.isEmpty(state.faculties) ? [] : [...state.faculties, payload];

    return updateStore(state, {
        status: 'success',
        actionType: 'new_faculty',
        isFetching: false,
        faculties: updatedFaculties,
    });
};

const createFacultyFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const updateFacultySuccess = (state, {payload}) => {
    const updatedFaculties = state.faculties.map(st => {
        if (st._id === payload._id) return payload;
        return st;
    });

    return updateStore(state, {
        status: 'success',
        actionType: 'edit_faculty',
        isFetching: false,
        faculties: updatedFaculties,
        faculty: payload,
    });
};

const updateFacultyFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const deleteFacultySuccess = (state, {payload}) => {
    const updatedList = state.faculties.filter(st => st._id !== payload.id);

    return updateStore(state, {
        status: 'success',
        isFetching: false,
        faculties: updatedList,
    });
};

const deleteFacultyFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

export const handlers = {
    [types.CLEAR_ACTION_RESULT_FACULTIES]: clearActionResult,

    [types.GET_ALL_FACULTIES_REQUEST]: customRequest,
    [types.GET_ALL_FACULTIES_SUCCESS]: getAllFacultiesSuccess,
    [types.GET_ALL_FACULTIES_FAIL]: getAllFacultiesFail,

    [types.GET_ONE_FACULTY_REQUEST]: customRequest,
    [types.GET_ONE_FACULTY_SUCCESS]: getOneFacultySuccess,
    [types.GET_ONE_FACULTY_FAIL]: getOneFacultyFail,

    [types.CREATE_NEW_FACULTY_REQUEST]: customRequest,
    [types.CREATE_NEW_FACULTY_SUCCESS]: createFacultySuccess,
    [types.CREATE_NEW_FACULTY_FAIL]: createFacultyFail,

    [types.CREATE_NEW_FACULTY_REQUEST]: customRequest,
    [types.UPDATE_FACULTY_SUCCESS]: updateFacultySuccess,
    [types.UPDATE_FACULTY_FAIL]: updateFacultyFail,

    [types.DELETE_FACULTY_REQUEST]: customRequest,
    [types.DELETE_FACULTY_SUCCESS]: deleteFacultySuccess,
    [types.DELETE_FACULTY_FAIL]: deleteFacultyFail,
};

export default createReducer(initialState, handlers);