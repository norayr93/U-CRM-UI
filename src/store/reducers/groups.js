import * as types from '../types';
import {createReducer} from '../../services/utilities';
import _ from 'lodash';

const initialState = {
    status: '',
    actionType: '',
    errorMessage: '',
    isFetching: false,
    groups: [],
    group: {},
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

const getAllGroupsSuccess = (state, {payload}) => {
    return updateStore(state, {
        status: 'success',
        isFetching: false,
        groups: payload,
    });
};

const getAllGroupsFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const getOneGroupSuccess = (state, {payload}) => {
    return updateStore(state, {
        status: 'success',
        isFetching: false,
        group: payload,
    });
};

const getOneGroupFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const createGroupSuccess = (state, {payload}) => {
    const updatedGroups = _.isEmpty(state.groups) ? [] : [...state.groups, payload];

    return updateStore(state, {
        status: 'success',
        actionType: 'new_group',
        isFetching: false,
        groups: updatedGroups,
    });
};

const createGroupFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        actionType: 'new_group',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const updateGroupSuccess = (state, {payload}) => {
    const updatedGroups = state.groups.map(st => {
        if (st._id === payload._id) return payload;
        return st;
    });

    return updateStore(state, {
        status: 'success',
        actionType: 'edit_group',
        isFetching: false,
        groups: updatedGroups,
        group: payload,
    });
};

const updateGroupFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        actionType: 'edit_group',
        isFetching: false,
        errorMessage: payload.message,
    });
};

const deleteGroupSuccess = (state, {payload}) => {
    const updatedList = state.groups.filter(st => st._id !== payload.id);

    return updateStore(state, {
        status: 'success',
        isFetching: false,
        groups: updatedList,
    });
};

const deleteGroupFail = (state, {payload}) => {
    return updateStore(state, {
        status: 'fail',
        isFetching: false,
        errorMessage: payload.message,
    });
};

export const handlers = {
    [types.CLEAR_ACTION_RESULT_GROUPS]: clearActionResult,

    [types.GET_ALL_GROUPS_REQUEST]: customRequest,
    [types.GET_ALL_GROUPS_SUCCESS]: getAllGroupsSuccess,
    [types.GET_ALL_GROUPS_FAIL]: getAllGroupsFail,

    [types.GET_ONE_GROUP_REQUEST]: customRequest,
    [types.GET_ONE_GROUP_SUCCESS]: getOneGroupSuccess,
    [types.GET_ONE_GROUP_FAIL]: getOneGroupFail,

    [types.CREATE_NEW_GROUP_REQUEST]: customRequest,
    [types.CREATE_NEW_GROUP_SUCCESS]: createGroupSuccess,
    [types.CREATE_NEW_GROUP_FAIL]: createGroupFail,

    [types.UPDATE_GROUP_REQUEST]: customRequest,
    [types.UPDATE_GROUP_SUCCESS]: updateGroupSuccess,
    [types.UPDATE_GROUP_FAIL]: updateGroupFail,

    [types.DELETE_GROUP_REQUEST]: customRequest,
    [types.DELETE_GROUP_SUCCESS]: deleteGroupSuccess,
    [types.DELETE_GROUP_FAIL]: deleteGroupFail,
};

export default createReducer(initialState, handlers);