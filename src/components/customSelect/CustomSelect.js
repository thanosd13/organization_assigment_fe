import Form from 'react-bootstrap/Form';

export const CustomSelect = ({
  options,
  placeholder,
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <Form.Label>{label && label}</Form.Label>
      <Form.Select value={value} name={name} onChange={onChange}>
        <option value=''>{placeholder}</option>
        {options.map(option => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </>
  );
};
