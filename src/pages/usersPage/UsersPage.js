import React, { useEffect, useState } from 'react';
import { CardContainer, Layout } from '../../styles/Styles';
import { Button, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  deleteUserService,
  getAllUserService,
  getUserService,
  registerService,
  updateUserService,
} from '../../services/userService';
import { BLUE_DARK, CIEL } from '../../constants/ColorsTypes';
import { DropDownMenu } from '../../components/dropDownMenu/DropDownMenu';
import { faBars, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserModal } from '../../modals/userModal/UserModal';
import { ConfirmationModal } from '../../modals/confirmationModal/ConfirmationModal';
import { validateEmail, validateFields } from '../../utils/utils';
import { useToast } from '../../contexts/ToastContext';
import { useLoader } from '../../contexts/LoaderContext';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [mode, setMode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    role: '',
    age: '',
    password: '',
  });
  const { showSuccess, showError } = useToast();
  const { showLoader, hideLoader } = useLoader();

  const requiredFields = [
    'name',
    'surname',
    'age',
    'username',
    'email',
    'role',
    'password',
  ];

  // modal actions
  const handleOpenModal = (mode, objId = null) => {
    setMode(mode);
    if (mode === 'edit') {
      getUserService(objId)
        .then(response => {
          setFormData(response.data);
          setShowModal(true);
        })
        .catch(error => {
          showError('Κάτι πήγε λάθος!');
        });
    } else {
      setShowModal(true);
      setFormData({
        name: '',
        surname: '',
        email: '',
        username: '',
        role: '',
        age: '',
        password: '',
      });
    }
  };

  const handleCloseModal = () => setShowModal(false);

  // set values in formData object
  const handleFieldChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'age' ? parseInt(value, 10) || '' : value,
    }));
  };

  const addUser = () => {
    console.log(formData);
    const checkForEmptyFields = validateFields(formData, requiredFields);
    if (checkForEmptyFields.length !== 0) {
      showError('Συμπληρώστε όλα τα πεδία!');
      return;
    }

    if (!validateEmail(formData.email)) {
      showError('Ο e-mail δεν τηρεί τις προϋποθέσεις!');
      return;
    }

    showLoader();
    registerService(formData)
      .then(response => {
        showSuccess();
        hideLoader();
        handleCloseModal();
        setRefreshFlag(prevFlag => !prevFlag);
      })
      .catch(error => {
        if (error.status === 409) {
          showError('Το username ή το e-mail υπάρχουν ήδη!');
        }
        showError();
        hideLoader();
      });
  };

  const updateUser = userId => {
    console.log(formData);
    const checkForEmptyFields = validateFields(formData, requiredFields);
    if (checkForEmptyFields.length !== 0) {
      showError('Συμπληρώστε όλα τα πεδία!');
      return;
    }

    if (!validateEmail(formData.email)) {
      showError('Ο e-mail δεν τηρεί τις προϋποθέσεις!');
      return;
    }

    showLoader();
    updateUserService(formData, userId)
      .then(response => {
        showSuccess();
        hideLoader();
        handleCloseModal();
        setRefreshFlag(prevFlag => !prevFlag);
      })
      .catch(error => {
        if (error.status === 409) {
          showError('Το username ή το e-mail υπάρχουν ήδη!');
        }
        showError();
        hideLoader();
      });
  };

  // confirmation modal
  const handleOpenConfrimationModal = userId => {
    setUserId(userId);
    setShowConfirmationModal(true);
  };
  const handleCloseConfrimationModal = () => setShowConfirmationModal(false);

  const deleteUser = () => {
    showLoader();
    setShowConfirmationModal(false);
    deleteUserService(userId)
      .then(response => {
        console.log(response);
        hideLoader();
        showSuccess();
        setRefreshFlag(prev => !prev);
      })
      .catch(error => {
        console.log(error);
        hideLoader();
        showError();
      });
  };

  // data table actions
  const getActions = row => [
    {
      id: 1,
      name: 'Επεξεργασία',
      icon: faEdit,
      onClick: () => handleOpenModal('edit', row._id),
    },
    {
      id: 2,
      name: 'Διαγραφή',
      icon: faTrash,
      onClick: () => handleOpenConfrimationModal(row._id),
    },
  ];

  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Όνομα Χρήστη',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Όνομα',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Επίθετο',
      selector: row => row.surname,
      sortable: true,
    },
    {
      name: 'E-mail',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Ηλικια',
      selector: row => row.age,
      sortable: true,
    },
    {
      name: 'Ρόλος',
      selector: row =>
        row.role === 'user'
          ? 'Χρήστης'
          : row.role === 'organization'
          ? 'Οργάνωση'
          : 'Διαχειριστής',
      sortable: true,
    },
    {
      name: 'Ενέργειες',
      cell: row => (
        <div>
          <DropDownMenu
            icon={faBars}
            textColor={BLUE_DARK}
            iconColor={BLUE_DARK}
            actions={getActions(row)}
          />
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: '163px',
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        background: CIEL,
      },
    },
  };

  useEffect(() => {
    getAllUserService()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [refreshFlag]);

  return (
    <Layout>
      <CardContainer className='w-100'>
        <Row className='align-items-center w-100'>
          <Col className='d-none d-lg-block' xs={6}>
            <h4>Χρήστες</h4>
          </Col>
          <Col className='d-flex align-items-end justify-content-end' xs={6}>
            <Button variant='success' onClick={() => handleOpenModal('add')}>
              Προσθήκη
            </Button>
          </Col>
        </Row>
        <DataTable
          columns={columns}
          data={users}
          pagination
          paginationPerPage={5}
          customStyles={customStyles}
          paginationRowsPerPageOptions={[2, 3, 4, 5]}
        />
      </CardContainer>
      <UserModal
        show={showModal}
        handleClose={handleCloseModal}
        mode={mode}
        createFunc={addUser}
        updateFunc={updateUser}
        onChange={handleFieldChange}
        editObj={formData}
      />
      <ConfirmationModal
        title='Διαγραφή Χρήστη'
        show={showConfirmationModal}
        handleClose={handleCloseConfrimationModal}
        body='Είστε σίγουροι ότι θέλετε να διαγράψετε το συγκεκριμένο χρήστη;'
        onCallback={deleteUser}
      />
    </Layout>
  );
};
