import Form from 'react-bootstrap/Form';

export const CustomSelect = ({
  options,
  placehodler,
  name,
  value,
  onChange,
}) => {
  return (
    <Form.Select value={value} name={name} onChange={onChange}>
      <option value=''>{placehodler}</option>
      {options.map(option => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};
