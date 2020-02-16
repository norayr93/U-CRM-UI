import {all} from 'redux-saga/effects';
import authSaga from './auth';
import user from './students';
import groups from './groups';
import faculties from './faculties';

export default function* rootSaga() {
    yield all([
        authSaga(),
        user(),
        groups(),
        faculties(),
    ]);
}
