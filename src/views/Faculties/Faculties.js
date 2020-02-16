import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Col, Table, Modal, ModalBody, ModalFooter} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {getAllFacultiesRequest, deleteFacultyRequest} from '../../store/actions';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {isEmpty} from 'lodash';

const buttonStyles = {background: 'transparent', border: 'none', verticalAlign: 'middle'};

const Faculties = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {faculties, status} = useSelector(state => state.faculties);

    const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
    const [currentFacultyId, setCurrentFacultyId] = useState();

    const handleToggleDeleteModal = () => toggleDeleteModal(c => !c);
    const handleDeleteFaculty = () => {
        dispatch(deleteFacultyRequest({facultyId: currentFacultyId}));
    };

    useDeepCompareEffect(() => {
        if (isEmpty(faculties)) dispatch(getAllFacultiesRequest());
    }, [dispatch, faculties]);

    return (
        <div className='faculties'>
            <div>
                <header>
                    <h2>Facultys Table</h2>
                </header>
                <div>
                    <Col col="8" sm="6" md="2" className="mb-3 mb-xl-0">
                        <Button
                            block
                            color="success"
                            size='xs'
                            onClick={() => history.push('/faculties/new')}
                        >
                            Create Faculty
                        </Button>
                    </Col>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map(faculty => {
                                return (
                                    <tr>
                                        <td>{faculty._id}</td>
                                        <td>{faculty.name}</td>
                                        <td>
                                            <button
                                                style={buttonStyles}
                                                onClick={() => history.push(`/faculties/${faculty._id}`)}
                                            >
                                                <i className="fa fa-edit fa-lg"></i>
                                            </button>
                                            <button
                                                style={buttonStyles}
                                                onClick={() => {
                                                    handleToggleDeleteModal(true);
                                                    setCurrentFacultyId(faculty._id);
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
                    Are you sure you want to delete this faculty ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        handleDeleteFaculty();
                        if (status === 'success') handleToggleDeleteModal(false);
                    }}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={handleToggleDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Faculties;