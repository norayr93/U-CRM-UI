/* eslint-disable no-debugger */
/* eslint-disable max-len */
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import _ from 'lodash';

const useForm = ({action = () => {}, initialState, formValidator = () => {}}) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState(initialState);
    const [initVals, setInitVals] = useState({});
    const [pristine, setPristine] = useState(true);
    const [errors, setErrors] = useState({});
    const [isInitialized, setIsInitialized] = useState(false);

    const setInputFields = (name, value, type, checked) => {
        if (type === 'text' || type === 'textarea' || type === 'password' || type === 'search') {
            setInputs(inputs => ({...inputs, [name]: value}));
        } else if (type === 'checkbox') {
            setInputs(inputs => ({...inputs, [name]: checked}));
        } else if (type === 'select') {
            setInputs(inputs => ({...inputs, [name]: value}));
        } else if (type === 'radio') {
            setInputs(inputs => ({...inputs, [value]: checked}));
        } else {
            setInputs(inputs => ({...inputs, [name]: value}));
        }
    };

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const errors = formValidator(inputs);

        if (!_.isEmpty(errors)) {
            setErrors(errors);
            return false;
        }

        dispatch(action(inputs));
    };

    const checkIfPristine = (name, value) => {
        if (typeof value !== 'object') return setPristine(value === initVals[name]);

        const initObj = initVals[name] || [];
        let isPristine;

        if (typeof value === 'object' && Array.isArray(value)) {
            isPristine = JSON.stringify(initObj) === JSON.stringify(value);
        } else {
            isPristine = initObj['label'] === value.label;
        }

        setPristine(isPristine);
    };

    const handleFieldChange = (fields, validateOnChange) => {
        const {name, values: {type, checked, value} = {}} = fields;

        !validateOnChange && setErrors({});
        checkIfPristine(name, value);

        if (validateOnChange) {
            const errors = formValidator({[name]: value});
            setErrors(errors);
        }

        if (fields && fields instanceof Array) {
            _.forEach(fields, (it) => setInputFields(it.name, it.value, it.type, it.checked));
        }
        setInputFields(name, value, type, checked);
    };

    const initializeFields = (values) => {
        setInputs((v) => ({...v, ...values}));
        setInitVals((v) => ({...v, ...values}));
        setIsInitialized(true);
        setPristine(true);
    };

    const generateError = (error) => setErrors(error);

    const boundHandleFieldChange = (e, validateOnChange) => {
        e.persist && e.persist();
        handleFieldChange({
            name: e.target.name,
            values: _.pick(e.target, ['value', 'checked', 'type']),
        }, validateOnChange);
    };

    const resetForm = () => setInputs(initialState);

    return {
        handleSubmit,
        handleFieldChange,
        boundHandleFieldChange,
        inputs,
        errors,
        initializeFields,
        isInitialized,
        resetForm,
        generateError,
        pristine,
    };
};

export default useForm;