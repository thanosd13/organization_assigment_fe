import React from 'react';
import { Form } from 'react-bootstrap';
import { RED } from '../../constants/ColorsTypes';

export const CustomInput = ({
  label,
  name,
  type,
  placeholder,
  required,
  onChange,
  value,
}) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>
        {label} {required && <span style={{ color: RED }}> *</span>}
      </Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value}
      />
    </Form.Group>
  );
};
