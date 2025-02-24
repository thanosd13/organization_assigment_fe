import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { CustomInput } from '../../components/customInput/CustomInput';
import { CustomSelect } from '../../components/customSelect/CustomSelect';

export const UserModal = ({
  show,
  mode,
  editObj,
  onChange,
  handleClose,
  createFunc,
  updateFunc,
}) => {
  const roles = [
    { id: 1, label: 'Χρήστης', value: 'user' },
    { id: 2, label: 'Οργάνωση', value: 'organization' },
    { id: 3, label: 'Διαχειριστής', value: 'admin' },
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
      size='md'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'add' ? 'Προσθήκη Χρήστη' : 'Επεξεργασία Χρήστη'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12}>
            <CustomInput
              label='Όνομα Χρήστη'
              name='username'
              onChange={onChange}
              value={editObj?.username}
            />
          </Col>
          <Col xs={12}>
            <CustomInput
              label='Όνομα'
              name='name'
              onChange={onChange}
              value={editObj?.name}
            />
          </Col>
          <Col xs={12}>
            <CustomInput
              label='Επίθετο'
              name='surname'
              onChange={onChange}
              value={editObj?.surname}
            />
          </Col>
          <Col xs={12}>
            <CustomInput
              label='E-mail'
              name='email'
              onChange={onChange}
              value={editObj?.surname}
            />
          </Col>
          <Col xs={12}>
            <CustomInput
              label='Ηλικία'
              name='age'
              type='number'
              onChange={onChange}
              value={editObj?.age}
            />
          </Col>
          <Col xs={12} className='mb-2'>
            <CustomSelect
              label='Ρόλος'
              options={roles}
              placeholder='Επιλέξτε'
              name='role'
              onChange={onChange}
              value={editObj?.role}
            />
          </Col>
          {mode === 'add' && (
            <Col xs={12}>
              <CustomInput
                label='Κωδικός Πρόσβασης'
                type='password'
                name='password'
                onChange={onChange}
                value={editObj?.email}
              />
            </Col>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {mode === 'add' ? (
          <Button variant='success' onClick={createFunc}>
            Προσθήκη
          </Button>
        ) : (
          <Button variant='warning' onClick={() => updateFunc(editObj?._id)}>
            Επεξεργασία
          </Button>
        )}
        <Button variant='danger' onClick={handleClose}>
          Ακύρωση
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
