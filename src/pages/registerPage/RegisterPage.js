import React, { useState } from 'react';
import { CardContainer, Layout } from '../../styles/Styles';
import { Logo } from '../../components/logo/Logo';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CustomInputGroup } from '../../components/customInputGroup/CustomInputGroup';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CustomSelect } from '../../components/customSelect/CustomSelect';
import { useLoader } from '../../contexts/LoaderContext';
import { registerService } from '../../services/userService';
import {
  validateEmail,
  validateFields,
  validatePassword,
} from '../../utils/utils';
import { useToast } from '../../contexts/ToastContext';

export const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    name: '',
    surname: '',
    age: null,
  });
  const { showLoader, hideLoader } = useLoader();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const requiredFields = [
    'name',
    'surname',
    'age',
    'username',
    'email',
    'role',
    'password',
  ];

  const roles = [
    { label: 'Χρήστης', value: 'user' },
    { label: 'Οργάνωση', value: 'organization' },
  ];

  // set values in registerData object
  const handleFieldChange = event => {
    const { name, value } = event.target;
    setRegisterData(prevRegisterData => ({
      ...prevRegisterData,
      [name]: name === 'age' ? parseInt(value, 10) || '' : value,
    }));
  };

  // register function
  const register = () => {
    const checkForEmptyFields = validateFields(registerData, requiredFields);
    if (checkForEmptyFields.length !== 0) {
      showError('Συμπληρώστε όλα τα πεδία!');
      return;
    }

    if (!validateEmail(registerData.email)) {
      showError('Ο e-mail δεν τηρεί τις προϋποθέσεις!');
      return;
    }

    if (!validatePassword(registerData.password)) {
      showError('Ο κωδικός πρόσβασης δεν τηρεί τις προϋποθέσεις!');
      return;
    }

    showLoader();
    registerService(registerData)
      .then(response => {
        showSuccess();
        hideLoader();
      })
      .catch(error => {
        if (error.status === 409) {
          showError('Το username ή το e-mail υπάρχουν ήδη!');
        }
        showError();
        hideLoader();
      });
  };

  return (
    <Layout
      height='100vh'
      className='d-flex align-items-center justify-content-center'
    >
      <CardContainer maxHeight='45rem'>
        <Logo
          width='100px'
          height='100px'
          style='d-flex align-items-center justify-content-center w-50'
        />
        <div className='w-100'>
          <CustomInputGroup
            icon={faUser}
            placeholder='Όνομα'
            name='name'
            onChange={handleFieldChange}
          />
          <CustomInputGroup
            icon={faUser}
            placeholder='Επώνυμο'
            name='surname'
            onChange={handleFieldChange}
          />
          <CustomInputGroup
            icon={faUser}
            placeholder='Ηλικία'
            name='age'
            type='number'
            onChange={handleFieldChange}
          />
          <CustomInputGroup
            icon={faUser}
            placeholder='Όνομα χρήστη'
            name='username'
            onChange={handleFieldChange}
          />
          <CustomInputGroup
            icon={faEnvelope}
            placeholder='E-mail'
            name='email'
            onChange={handleFieldChange}
          />
          <CustomSelect
            options={roles}
            placehodler='Επιλέξτε'
            name='role'
            onChange={handleFieldChange}
          />
          <CustomInputGroup
            classes='pt-3'
            icon={faLock}
            placeholder='Κωδικός πρόσβασης'
            name='password'
            type='password'
            onChange={handleFieldChange}
          />
        </div>
        <div className='d-flex flex-row align-items-center justify-content-start w-100 gap-4'>
          <Button onClick={register}>Εγγραφή</Button>
          <span onClick={() => navigate('/login')} className='already-account'>
            Έχετε ήδη ενεργό λογαριασμό;
          </span>
        </div>
      </CardContainer>
    </Layout>
  );
};
