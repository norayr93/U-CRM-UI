import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {Row, Button, Col, Form, FormGroup, Label, Input, FormFeedback, Alert} from 'reactstrap';
import useForm from '../../services/custom-hooks';
import {
    createNewStudentRequest,
    getOneStudentRequest,
    updateStudentRequest,
    clearActionResultStudents,
    getAllFacultiesRequest,
    getAllGroupsRequest,
} from '../../store/actions';
import {studentValidator} from '../../services/validators';
import {boundNotificationTimeout} from '../../services/helpers/core';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {NOTIFICATION_MESSAGES} from '../../constants';

const initialState = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    faculty: '',
    group: '',
};

const EditStudent = () => {
    const dispatch = useDispatch();
    const {studentId} = useParams();
    const history = useHistory();

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [isGroupSelectVisible, setIsGroupSelectVisible] = useState(false);

    const [headerText, action] = studentId ?
    ['Edit Student', updateStudentRequest] : ['Create Student', createNewStudentRequest];

    const {faculties} = useSelector(state => state.faculties);
    const {groups} = useSelector(state => state.groups);
    const currentStudent = useSelector(state => state.students.student);
    const {status, actionType, errorMessage} = useSelector(state => state.students);

    const alertText = status === 'success' && actionType === 'edit_student' ?
    NOTIFICATION_MESSAGES[actionType] : errorMessage;
    const color = status === 'success' ? 'success' : 'danger';

    const {
        inputs, errors, pristine,
        initializeFields,
        boundHandleFieldChange, handleSubmit,
    } = useForm({initialState, action, formValidator: studentValidator});

    const handleFacultyChange = e => {
        setIsGroupSelectVisible(true);
        boundHandleFieldChange(e);
    };

    const handleGroupChange = e => {
        boundHandleFieldChange(e);
    };

    useEffect(() => {
        if(studentId) dispatch(getOneStudentRequest({studentId}));
    }, [dispatch, studentId]);

    useEffect(() => {
        if(_.isEmpty(faculties)) dispatch(getAllFacultiesRequest());
        if(_.isEmpty(groups)) dispatch(getAllGroupsRequest());
    }, [dispatch, faculties, groups]);

    useDeepCompareEffect(() => {
        (status === 'success' && actionType === 'edit_student') ?
        setIsNotificationVisible(true) : setIsNotificationVisible(false);

        studentId ? initializeFields(currentStudent) : initializeFields(initialState);
        if (actionType === 'edit_student') boundNotificationTimeout(3000, () => dispatch(clearActionResultStudents()));

        if (!studentId && actionType === 'new_student' && status === 'success') {
            dispatch(clearActionResultStudents());
            history.push('/students');
        }
    }, [currentStudent, status, actionType]);

    return (
        <div>
            {isNotificationVisible && <Alert isOpen={isNotificationVisible} color={color}>
                {alertText}
            </Alert>}
            <header>
                <h2>{headerText}</h2>
            </header>
            <Form onSubmit={handleSubmit}>
                {Object.keys(initialState).filter(k => k !== 'faculty' && k!== 'group').map((field, i) => {
                    const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
                    return (
                        <FormGroup>
                            <Label htmlFor={`student-${field}IsValid`}>{capitalizedField}</Label>
                            <Input
                                onChange={boundHandleFieldChange}
                                name={field}
                                type="text"
                                id={`student-${field}IsValid`}
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
                <FormGroup>
                    <Col xs="12" md="9"> Faculties
                    <Input
                        onChange={handleFacultyChange}
                        type="select"
                        name="faculty"
                        id="SelectLm"
                        bsSize="sm"
                    >
                        <option selected disabled value> -- Select the Faculty -- </option>
                        {faculties.map(faculty => {
                            return (
                                <option selected={inputs['faculty'] === faculty.name} value={faculty.name}>{faculty.name}</option>
                            );
                        })}
                    </Input>
                    </Col>
                </FormGroup>
                {(isGroupSelectVisible || inputs['group']) && <FormGroup>
                    <Col xs="12" md="9"> Groups
                    <Input
                        onChange={handleGroupChange}
                        type="select"
                        name="group"
                        id="SelectLm"
                        bsSize="sm"
                    >
                        <option selected disabled value> -- Select the Group -- </option>
                        {groups.map(group => (
                            <option selected={inputs['group'] === group.name} value={group.name}>{group.name}</option>
                        ))}
                    </Input>
                    </Col>
                </FormGroup>}
                <Row>
                    <Col col="6" sm="4" md="1" className="mb-3 mb-xl-0">
                        <Button
                            color="danger"
                            size='xs'
                            onClick={() => history.push('/students')}
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

export default EditStudent;