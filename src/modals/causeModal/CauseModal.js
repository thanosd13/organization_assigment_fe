import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { CustomInput } from '../../components/customInput/CustomInput';
import { CustomTextArea } from '../../components/customTextArea/CustomTextArea';

export const CauseModal = ({
  show,
  mode,
  editObj,
  onChange,
  handleClose,
  createFunc,
  updateFunc,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'add' ? 'Προσθήκη Εκδήλωσης' : 'Επεξεργασία Εκδήλωσης'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12}>
            <CustomInput
              label='Τίτλος'
              name='title'
              onChange={onChange}
              value={editObj?.title}
            />
          </Col>
          <Col xs={12}>
            <CustomInput
              label='Τοποθεσία'
              name='location'
              onChange={onChange}
              value={editObj?.location}
            />
          </Col>
          {mode === 'add' && (
            <Col xs={12}>
              <CustomInput
                label='Φωτογραφία'
                name='image'
                type='file'
                onChange={onChange}
              />
            </Col>
          )}
          <Col xs={12}>
            <CustomTextArea
              label='Περιγραφή'
              name='description'
              onChange={onChange}
              value={editObj?.description}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {mode === 'add' ? (
          <Button variant='success' onClick={createFunc}>
            Υποβολή
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
