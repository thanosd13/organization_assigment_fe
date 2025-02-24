import React from 'react';
import { Navbar } from 'react-bootstrap';
import {
  faHome,
  faMessage,
  faRightFromBracket,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../logo/Logo';
import { BLUE_DARK, CIEL } from '../../constants/ColorsTypes';
import { DropDownMenu } from '../dropDownMenu/DropDownMenu';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { logout, authState } = useAuth();
  const navigate = useNavigate();
  const getActions = () => [
    {
      id: 1,
      name: 'Αρχική',
      icon: faHome,
      onClick: () => {
        navigate(authState?.role === 'admin' ? '/users' : '/home');
      },
    },
    {
      id: 2,
      name: 'Μηνύματα',
      icon: faMessage,
      onClick: () => {
        navigate('/chat');
      },
    },
    {
      id: 3,
      name: 'Αποσύνδεση',
      icon: faRightFromBracket,
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  return (
    <Navbar
      className='d-flex justify-content-between px-md-4'
      expand='lg'
      style={{ backgroundColor: CIEL, height: '13vh' }}
    >
      <div className='d-flex align-items-center justify-content-between w-100 px-md-4'>
        <Navbar.Brand
          className='brand logo'
          onClick={() =>
            navigate(authState?.role === 'admin' ? '/users' : '/home')
          }
        >
          <Logo style='mobile-logo' />
        </Navbar.Brand>
        <div className='organization-container'>
          <h2 className='text-white'>#organization</h2>
        </div>
        {localStorage.getItem('token') && (
          <div className='d-flex flex-row align-items-center justify-content-center'>
            <h6 className='text-white mt-3'>{authState?.username}</h6>
            <DropDownMenu
              size='2x'
              icon={faUser}
              actions={getActions()}
              textColor={BLUE_DARK}
            />
          </div>
        )}
      </div>
    </Navbar>
  );
};
