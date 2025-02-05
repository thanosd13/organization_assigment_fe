import React, { useState } from 'react';
import { CardContainer, Layout } from '../../styles/Styles';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../../components/logo/Logo';
import { Button } from 'react-bootstrap';
import { CustomInputGroup } from '../../components/customInputGroup/CustomInputGroup';
import { loginService } from '../../services/userService';

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({});

  // set values in loginData object
  const handleFieldChange = event => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const login = () => {
    loginService(loginData)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Layout
      height='100vh'
      className='d-flex align-items-center justify-content-center'
    >
      <CardContainer>
        <Logo
          width='100px'
          height='100px'
          style='d-flex align-items-center justify-content-center w-50'
        />
        <div className='w-100'>
          <CustomInputGroup
            icon={faUser}
            placeholder='Όνομα χρήστη'
            name='username'
            onChange={handleFieldChange}
          />
          <CustomInputGroup
            icon={faLock}
            placeholder='Κωδικός πρόσβασης'
            name='password'
            type='password'
            onChange={handleFieldChange}
          />
        </div>
        <div className='d-flex flex-row align-items-center justify-content-start w-100 gap-4'>
          <Button onClick={login}>Σύνδεση</Button>
          <span className='not-already-account'>
            Δεν έχετε ενεργό λογαριασμό;
          </span>
        </div>
      </CardContainer>
    </Layout>
  );
};
