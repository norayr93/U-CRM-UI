import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import {Col, Table, Input, FormGroup, Button} from 'reactstrap';
import {getAllFacultiesRequest, getAllGroupsRequest, getAllStudentsRequest} from '../../store/actions';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useForm from '../../services/custom-hooks';

const initialState = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    faculty: '',
    group: '',
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const students = useSelector(state => state.students.students);
    const faculties = useSelector(state => state.faculties.faculties);
    const groups = useSelector(state => state.groups.groups);

    const {
        inputs, errors,
        boundHandleFieldChange,
    } = useForm({initialState, action: () => {}});

    const fieldsAreEmpty = Object.values(inputs).every(v => v === '');
    const debouncedFunc = _.debounce((props) => dispatch(getAllStudentsRequest(props)), 500, {maxWait: 1000});

    useDeepCompareEffect(() => {
        if(_.isEmpty(faculties)) dispatch(getAllFacultiesRequest());
        if(_.isEmpty(groups)) dispatch(getAllGroupsRequest());
        if(_.isEmpty(students) && fieldsAreEmpty) dispatch(getAllStudentsRequest());
    }, [dispatch, faculties, groups, students, fieldsAreEmpty]);

    useDeepCompareEffect(() => {
        !fieldsAreEmpty && debouncedFunc({queryParams: inputs});
    }, [inputs, fieldsAreEmpty]);

    return (
        <div className='students'>
            <div>
                <header style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h2>Dashboard</h2>
                    <Col col="6" sm="4" md="1" className="mb-3 mb-xl-0">
                        <Button
                            color="success"
                            size='xs'
                            type='submit'
                        >
                            Search
                        </Button>
                    </Col>
                </header>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Faculties</th>
                                <th>Groups</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.keys(initialState).filter(k => k !== 'faculty' && k!== 'group').map((field, i) => {
                                    return (
                                        <td>
                                            <Input
                                                onChange={boundHandleFieldChange}
                                                name={field}
                                                type="text"
                                                id={`student-${field}IsValid`}
                                                invalid={!_.isEmpty(errors[field])}
                                                value={inputs[field]}
                                                placeholder={`Search by ${field}...`}
                                            />
                                        </td>
                                    );
                                })}
                                <td>
                                    <FormGroup row>
                                        <Col xs="12" md="9">
                                        <Input
                                            onChange={boundHandleFieldChange}
                                            type="select"
                                            name="faculty"
                                            id="SelectLm"
                                            bsSize="sm"
                                        >
                                            <option selected value=''> -- Select the Faculty -- </option>
                                            {faculties.map(faculty => (
                                                <option value={faculty.name}>{faculty.name}</option>
                                            ))}
                                        </Input>
                                        </Col>
                                    </FormGroup>
                                </td>
                                <td>
                                    <FormGroup row>
                                        <Col xs="12" md="9">
                                        <Input
                                            onChange={boundHandleFieldChange}
                                            type="select"
                                            name="group"
                                            id="SelectLm"
                                            bsSize="sm"
                                        >
                                            <option selected value=''> -- Select the Group -- </option>
                                            {groups.map(group => (
                                                <option value={group.name}>{group.name}</option>
                                            ))}
                                        </Input>
                                        </Col>
                                    </FormGroup>
                                </td>
                            </tr>
                            {students.map(student => {
                                return (
                                    <tr>
                                        <td>{student._id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.lastname}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.faculty}</td>
                                        <td>{student.group}</td>
                                        {/* <td>{student.course}</td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                     </Table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;