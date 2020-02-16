import {createAction} from 'redux-actions';
import * as types from '../types';

export const clearActionResultFaculties = createAction(types.CLEAR_ACTION_RESULT_FACULTIES);

export const getAllFacultiesRequest = createAction(types.GET_ALL_FACULTIES_REQUEST);
export const getAllFacultiesSuccess = createAction(types.GET_ALL_FACULTIES_SUCCESS);
export const getAllFacultiesFail = createAction(types.GET_ALL_FACULTIES_FAIL);

export const getOneFacultyRequest = createAction(types.GET_ONE_FACULTY_REQUEST);
export const getOneFacultySuccess = createAction(types.GET_ONE_FACULTY_SUCCESS);
export const getOneFacultyFail = createAction(types.GET_ONE_FACULTY_FAIL);

export const createNewFacultyRequest = createAction(types.CREATE_NEW_FACULTY_REQUEST);
export const createNewFacultySuccess = createAction(types.CREATE_NEW_FACULTY_SUCCESS);
export const createNewFacultyFail = createAction(types.CREATE_NEW_FACULTY_FAIL);

export const updateFacultyRequest = createAction(types.UPDATE_FACULTY_REQUEST);
export const updateFacultySuccess = createAction(types.UPDATE_FACULTY_SUCCESS);
export const updateFacultyFail = createAction(types.UPDATE_FACULTY_FAIL);

export const deleteFacultyRequest = createAction(types.DELETE_FACULTY_REQUEST);
export const deleteFacultySuccess = createAction(types.DELETE_FACULTY_SUCCESS);
export const deleteFacultyFail = createAction(types.DELETE_FACULTY_FAIL);
