import {formValidator} from './form';

const validationRules = {
    name: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
    lastname: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
    email: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
    phone: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
    faculty: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
    group: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
};

export default (values) => formValidator(values, validationRules);