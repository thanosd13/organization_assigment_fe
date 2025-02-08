import React from 'react';
import { Form } from 'react-bootstrap';

export const CustomTextArea = ({ label, name, value, onChange }) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        as='textarea'
        defaultValue={value}
        rows={3}
        onChange={onChange}
      />
    </Form.Group>
  );
};
