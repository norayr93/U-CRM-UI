import {createAction} from 'redux-actions';
import * as types from '../types';

export const clearActionResultStudents = createAction(types.CLEAR_ACTION_RESULT_STUDENTS);

export const getAllStudentsRequest = createAction(types.GET_ALL_STUDENTS_REQUEST);
export const getAllStudentsSuccess = createAction(types.GET_ALL_STUDENTS_SUCCESS);
export const getAllStudentsFail = createAction(types.GET_ALL_STUDENTS_FAIL);

export const getOneStudentRequest = createAction(types.GET_ONE_STUDENT_REQUEST);
export const getOneStudentSuccess = createAction(types.GET_ONE_STUDENT_SUCCESS);
export const getOneStudentFail = createAction(types.GET_ONE_STUDENT_FAIL);

export const createNewStudentRequest = createAction(types.CREATE_NEW_STUDENT_REQUEST);
export const createNewStudentSuccess = createAction(types.CREATE_NEW_STUDENT_SUCCESS);
export const createNewStudentFail = createAction(types.CREATE_NEW_STUDENT_FAIL);

export const updateStudentRequest = createAction(types.UPDATE_STUDENT_REQUEST);
export const updateStudentSuccess = createAction(types.UPDATE_STUDENT_SUCCESS);
export const updateStudentFail = createAction(types.UPDATE_STUDENT_FAIL);

export const deleteStudentRequest = createAction(types.DELETE_STUDENT_REQUEST);
export const deleteStudentSuccess = createAction(types.DELETE_STUDENT_SUCCESS);
export const deleteStudentFail = createAction(types.DELETE_STUDENT_FAIL);
