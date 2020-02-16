import {createAction} from 'redux-actions';
import * as types from '../types';

export const clearActionResultGroups = createAction(types.CLEAR_ACTION_RESULT_GROUPS);

export const getAllGroupsRequest = createAction(types.GET_ALL_GROUPS_REQUEST);
export const getAllGroupsSuccess = createAction(types.GET_ALL_GROUPS_SUCCESS);
export const getAllGroupsFail = createAction(types.GET_ALL_GROUPS_FAIL);

export const getOneGroupRequest = createAction(types.GET_ONE_GROUP_REQUEST);
export const getOneGroupSuccess = createAction(types.GET_ONE_GROUP_SUCCESS);
export const getOneGroupFail = createAction(types.GET_ONE_GROUP_FAIL);

export const createNewGroupRequest = createAction(types.CREATE_NEW_GROUP_REQUEST);
export const createNewGroupSuccess = createAction(types.CREATE_NEW_GROUP_SUCCESS);
export const createNewGroupFail = createAction(types.CREATE_NEW_GROUP_FAIL);

export const updateGroupRequest = createAction(types.UPDATE_GROUP_REQUEST);
export const updateGroupSuccess = createAction(types.UPDATE_GROUP_SUCCESS);
export const updateGroupFail = createAction(types.UPDATE_GROUP_FAIL);

export const deleteGroupRequest = createAction(types.DELETE_GROUP_REQUEST);
export const deleteGroupSuccess = createAction(types.DELETE_GROUP_SUCCESS);
export const deleteGroupFail = createAction(types.DELETE_GROUP_FAIL);
