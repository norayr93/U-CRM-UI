import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
import {useHistory} from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {Button, Col, Table, Modal, ModalBody, ModalFooter} from 'reactstrap';
import {deleteGroupRequest, getAllGroupsRequest} from '../../store/actions';

const buttonStyles = {background: 'transparent', border: 'none', verticalAlign: 'middle'};

const Groups = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {groups, status} = useSelector(state => state.groups);
    const {faculties} = useSelector(state => state.faculties);

    const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
    const [currentGroupId, setCurrentGroupId] = useState();

    const handleToggleDeleteModal = () => toggleDeleteModal(c => !c);
    const handleDeleteGroup = () => {
        dispatch(deleteGroupRequest({groupId: currentGroupId}));
    };

    useDeepCompareEffect(() => {
        if (isEmpty(groups)) dispatch(getAllGroupsRequest());
    }, [dispatch, groups]);

    return (
        <div className='groups'>
            <div>
                <header>
                    <h2>Groups Table</h2>
                </header>
                <div>
                    <Col col="8" sm="6" md="2" className="mb-3 mb-xl-0">
                        <Button
                            block
                            color="success"
                            size='xs'
                            onClick={() => history.push('/groups/new')}
                        >
                            Create Group
                        </Button>
                    </Col>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Faculty</th>
                                <th>Group</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(group => {
                                return (
                                    <tr>
                                        <td>{group._id}</td>
                                        <td>{group.faculty}</td>
                                        <td>{group.group}</td>
                                        <td>
                                            <button
                                                style={buttonStyles}
                                                onClick={() => history.push(`/groups/${group._id}`)}
                                            >
                                                <i className="fa fa-edit fa-lg"></i>
                                            </button>
                                            <button
                                                style={buttonStyles}
                                                onClick={() => {
                                                    handleToggleDeleteModal(true);
                                                    setCurrentGroupId(group._id);
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
                    Are you sure you want to delete this group ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        handleDeleteGroup();
                        if (status === 'success') handleToggleDeleteModal(false);
                    }}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={handleToggleDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Groups;