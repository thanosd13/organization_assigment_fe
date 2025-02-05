import React from 'react';
import { CardContainer, Layout } from '../../styles/Styles';
import { Logo } from '../../components/logo/Logo';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { CustomInputGroup } from '../../components/customInputGroup/CustomInputGroup';
import { Button } from 'react-bootstrap';

export const RegisterPage = () => {
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
          />
          <CustomInputGroup
            icon={faLock}
            placeholder='Κωδικός πρόσβασης'
            name='password'
            type='password'
          />
        </div>
        <div className='d-flex flex-row align-items-center justify-content-start w-100 gap-4'>
          <Button>Εγγραφή</Button>
          <span className='already-account'>Έχετε ήδη ενεργό λογαριασμό;</span>
        </div>
      </CardContainer>
    </Layout>
  );
};
