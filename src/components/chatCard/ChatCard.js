import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

export const ChatCard = ({ user, setUser }) => {
  return (
    <div className='user-card-container'>
      <div className='user-card'>
        <div className='user-info'>
          <span className='user-icon'>
            <FontAwesomeIcon icon={faUser} size='1x' />
          </span>
          <span className='user-name'>{user?.username}</span>
        </div>
        <Button variant='success' onClick={() => setUser(user)}>
          Συνομιλία
        </Button>
      </div>
    </div>
  );
};
