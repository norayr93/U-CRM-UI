import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {Row, Button, Col, Form, FormGroup, Label, Input, FormFeedback, Alert} from 'reactstrap';
import useForm from '../../services/custom-hooks';
import {
    createNewGroupRequest,
    getOneGroupRequest,
    updateGroupRequest,
    clearActionResultGroups,
    getAllFacultiesRequest} from '../../store/actions';
import {groupValidator} from '../../services/validators';
import {boundNotificationTimeout} from '../../services/helpers/core';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {NOTIFICATION_MESSAGES} from '../../constants';

const initialState = {
    name: '',
};

const EditGroup = () => {
    const dispatch = useDispatch();
    const {groupId} = useParams();
    const history = useHistory();

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const [headerText, action] = groupId ?
    ['Edit Group', updateGroupRequest] : ['Create Group', createNewGroupRequest];

    const {
        status, actionType, group: currentGroup, errorMessage,
    } = useSelector(state => state.groups);
    const faculties = useSelector(state => state.faculties.faculties);

    const alertText = status === 'success' && actionType === 'edit_group' ?
    NOTIFICATION_MESSAGES[actionType] : errorMessage;
    const color = status === 'success' ? 'success' : 'danger';

    const {
        inputs, errors, pristine,
        initializeFields,
        boundHandleFieldChange, handleSubmit,
    } = useForm({initialState, action, formValidator: groupValidator});

    const handleFacultyChange = e => {
        initializeFields({faculty: e.target.value});
    };

    useEffect(() => {
        if(groupId) dispatch(getOneGroupRequest({groupId}));
    }, [dispatch, groupId]);

    useEffect(() => {
        if(_.isEmpty(faculties)) dispatch(getAllFacultiesRequest());
    }, [dispatch, faculties]);

    useDeepCompareEffect(() => {
        (actionType === 'edit_group' || actionType === 'new_group') ?
        setIsNotificationVisible(true) : setIsNotificationVisible(false);

        groupId ? initializeFields(currentGroup) : initializeFields(initialState);
        if (actionType === 'edit_group' || actionType === 'new_group') {
            boundNotificationTimeout(3000, () => dispatch(clearActionResultGroups()));
        }

        if (!groupId && actionType === 'new_group' && status === 'success') history.push('/groups');
    }, [currentGroup, status, actionType]);

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
                        <FormGroup>
                            <Label htmlFor={`group-${field}IsValid`}>{capitalizedField}</Label>
                            <Input
                                onChange={boundHandleFieldChange}
                                name={field}
                                type="text"
                                id={`group-${field}IsValid`}
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
                        name="selectSm"
                        id="SelectLm"
                        bsSize="sm"
                    >
                        <option selected disabled value> -- Select the Faculty -- </option>
                        {faculties.map(faculty => (
                            <option value={faculty.name}>{faculty.name}</option>
                        ))}
                    </Input>
                    </Col>
                </FormGroup>
                <Row>
                    <Col col="6" sm="4" md="1" className="mb-3 mb-xl-0">
                        <Button
                            color="danger"
                            size='xs'
                            onClick={() => history.push('/groups')}
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

export default EditGroup;