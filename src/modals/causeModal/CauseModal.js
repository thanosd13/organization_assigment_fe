import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { CustomInput } from '../../components/customInput/CustomInput';
import { CustomTextArea } from '../../components/customTextArea/CustomTextArea';

export const CauseModal = ({ show, onChange, handleClose, createFunc }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Προσθήκη Εκδήλωσης</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12}>
            <CustomInput label='Τίτλος' name='title' onChange={onChange} />
          </Col>
          <Col xs={12}>
            <CustomInput
              label='Τοποθεσία'
              name='location'
              onChange={onChange}
            />
          </Col>
          <Col xs={12}>
            <CustomTextArea
              label='Περιγραφή'
              name='description'
              onChange={onChange}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={createFunc}>
          Υποβολή
        </Button>
        <Button variant='danger' onClick={handleClose}>
          Ακύρωση
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
