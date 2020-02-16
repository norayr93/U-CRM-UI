import {formValidator} from './form';

const validationRules = {
    username: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
    password: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
};

export default (values) => formValidator(values, validationRules);