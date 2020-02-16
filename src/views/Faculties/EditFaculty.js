import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {Row, Button, Col, Form, FormGroup, Label, Input, FormFeedback, Alert} from 'reactstrap';
import useForm from '../../services/custom-hooks';
import {
    createNewFacultyRequest,
    getOneFacultyRequest,
    updateFacultyRequest,
    clearActionResultFaculties} from '../../store/actions';
import {facultyValidator} from '../../services/validators';
import {boundNotificationTimeout} from '../../services/helpers/core';
import {NOTIFICATION_MESSAGES} from '../../constants';
import useDeepCompareEffect from 'use-deep-compare-effect';

const initialState = {
    name: '',
};

const EditFaculty = () => {
    const dispatch = useDispatch();
    const {facultyId} = useParams();
    const history = useHistory();

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const [headerText, action] = facultyId ?
    ['Edit Faculty', updateFacultyRequest] : ['Create Faculty', createNewFacultyRequest];

    const currentFaculty = useSelector(state => state.faculties.faculty);
    const {status, actionType, errorMessage} = useSelector(state => state.faculties);

    const alertText = status === 'success' && actionType === 'edit_faculty' ?
    NOTIFICATION_MESSAGES[actionType] : errorMessage;

    const color = status === 'success' ? 'success' : 'danger';

    const {
        inputs, errors, pristine,
        initializeFields,
        boundHandleFieldChange, handleSubmit,
    } = useForm({initialState, action, formValidator: facultyValidator});

    useEffect(() => {
        if(facultyId) dispatch(getOneFacultyRequest({facultyId}));
    }, [dispatch, facultyId]);

    useDeepCompareEffect(() => {
        (status === 'success' && actionType === 'edit_faculty') ?
        setIsNotificationVisible(true) : setIsNotificationVisible(false);

        facultyId ? initializeFields(currentFaculty) : initializeFields(initialState);
        if (actionType === 'edit_faculty') boundNotificationTimeout(3000, () => dispatch(clearActionResultFaculties()));

        if (!facultyId && actionType === 'new_faculty' && status === 'success') history.push('/faculties');
    }, [currentFaculty, status, actionType]);

    return (
        <div>
            {isNotificationVisible && <Alert isOpen={isNotificationVisible} color={color}>
                {alertText}
            </Alert>}
            <header>
                <h2>{headerText}</h2>
            </header>
            <Form onSubmit={handleSubmit}>
                {Object.keys(initialState).map((field, i) => {
                    const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
                    return (
                        <FormGroup key={i}>
                            <Label htmlFor={`faculty-${field}IsValid`}>{capitalizedField}</Label>
                            <Input
                                onChange={boundHandleFieldChange}
                                name={field}
                                type="text"
                                id={`faculty-${field}IsValid`}
                                invalid={!_.isEmpty(errors[field])}
                                value={inputs[field]}
                                placeholder={capitalizedField}
                                autoComplete={capitalizedField}
                            />
                            {errors['name'] &&
                                <FormFeedback valid={_.isEmpty(errors['name'])}>
                                    {errors['name']}
                                </FormFeedback>
                            }
                        </FormGroup>
                    );
                })}
                <Row>
                    <Col col="6" sm="4" md="1" className="mb-3 mb-xl-0">
                        <Button
                            color="danger"
                            size='xs'
                            onClick={() => history.push('/faculties')}
                        >
                            Cancel
                        </Button>
                    </Col>
                    <Col col="6" sm="4" md="1" className="mb-3 mb-xl-0">
                        <Button
                            color="success"
                            size='xs'
                            type='submit'
                            disabled={pristine}
                        >
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default EditFaculty;