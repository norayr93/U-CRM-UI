import url from 'url';
import _ from 'lodash';

export const BACKEND_URL = url.format({
    protocol: _.get(process.env, 'REACT_APP_BACKEND_PROTOCOL'),
    hostname: _.get(process.env, 'REACT_APP_BACKEND_HOSTNAME'),
    port: _.get(process.env, 'REACT_APP_BACKEND_PORT'),
});
