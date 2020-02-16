/* eslint-disable no-dupe-keys */
import _ from 'lodash';
import querystring from 'querystring';
import {StorageManager} from '../utilities';

export const buildUrl = (path, queryParams) => {
    return (_.isNil(queryParams) || _.isEmpty(queryParams)) ? path : `${path}?${querystring.stringify(queryParams)}`;
};

export const getRequestHeaders = requestType => {
    const session = StorageManager.get('session');
    return _.cond([
        [_.matches('get'), _.constant({
            'Accept': 'application/json, text/plain, */*',
            'token': `${session}`,
        })],
        [_.matches('post'), _.constant({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': `${session}`,
        })],
        [_.matches('put'), _.constant({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': `${session}`,
        })],
        [_.matches('delete'), _.constant({
            'Accept': 'application/json',
            'token': `${session}`,
        })],
    ])(requestType);
};