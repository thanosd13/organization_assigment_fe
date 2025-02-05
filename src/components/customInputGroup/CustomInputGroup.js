import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CustomInputGroup = ({
  icon,
  placeholder,
  name,
  type,
  onChange,
  required,
}) => {
  return (
    <InputGroup className='mb-3'>
      <InputGroup.Text>
        <FontAwesomeIcon icon={icon} />
      </InputGroup.Text>
      <Form.Control
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        required={required}
      />
    </InputGroup>
  );
};
