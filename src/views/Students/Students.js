import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Col, Table, Modal, ModalBody, ModalFooter} from 'reactstrap';
import {isEmpty} from 'lodash';
import {getAllStudentsRequest, deleteStudentRequest} from '../../store/actions';
import useDeepCompareEffect from 'use-deep-compare-effect';

const buttonStyles = {background: 'transparent', border: 'none', verticalAlign: 'middle'};

const Students = ({history}) => {
    const dispatch = useDispatch();
    const {students, status} = useSelector(state => state.students);

    const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState();

    const handleToggleDeleteModal = () => toggleDeleteModal(c => !c);
    const handleDeleteStudent = () => {
        dispatch(deleteStudentRequest({studentId: currentStudentId}));
    };

    useDeepCompareEffect(() => {
        if (isEmpty(students)) dispatch(getAllStudentsRequest());
    }, [dispatch, students]);

    return (
        <div className='students'>
            <div>
                <header>
                    <h2>Students Table</h2>
                </header>
                <div>
                    <Col col="8" sm="6" md="2" className="mb-3 mb-xl-0">
                        <Button
                            block
                            color="success"
                            size='xs'
                            onClick={() => history.push('/students/new')}
                        >
                            Create Student
                        </Button>
                    </Col>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Faculties</th>
                                <th>Groups</th>
                                <th>Courses</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{student._id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.lastname}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.faculty}</td>
                                        <td>{student.group}</td>
                                        <td>{student.course}</td>
                                        <td>
                                            <button
                                                style={buttonStyles}
                                                onClick={() => history.push(`/students/${student._id}`)}
                                            >
                                                <i className="fa fa-edit fa-lg"></i>
                                            </button>
                                            <button
                                                style={buttonStyles}
                                                onClick={() => {
                                                    handleToggleDeleteModal(true);
                                                    setCurrentStudentId(student._id);
                                                }}
                                            >
                                                <i className="fa fa-close fa-lg"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                     </Table>
                </div>
            </div>
            <Modal isOpen={isDeleteModalOpen} toggle={handleToggleDeleteModal} className='modal-sm'>
                <ModalBody>
                    Are you sure you want to delete this student ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        handleDeleteStudent();
                        if (status === 'success') handleToggleDeleteModal(false);
                    }}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={handleToggleDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Students;