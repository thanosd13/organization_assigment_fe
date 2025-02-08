import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

export const ConfirmationModal = ({
  show,
  handleClose,
  title,
  body,
  onCallback,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <span>{body}</span>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCallback}>Ναι</Button>
        <Button variant='danger' onClick={handleClose}>
          Όχι
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
