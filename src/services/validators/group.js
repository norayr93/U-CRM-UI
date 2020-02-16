import {formValidator} from './form';

const validationRules = {
    name: [{
        method: 'isLength',
        options: {min: 1},
        message: 'Required',
    }],
};

export default (values) => formValidator(values, validationRules);