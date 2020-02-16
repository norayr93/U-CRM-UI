import {combineReducers} from 'redux';
import login from './login';
import students from './students';
import groups from './groups';
import faculties from './faculties';

const reducer = combineReducers({
   login,
   students,
   groups,
   faculties,
});

export default reducer;