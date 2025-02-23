import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DropDownMenu = ({ icon, size, textColor, iconColor, actions }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className='custom-dropdown-toggle' id='dropdown-basic'>
        <FontAwesomeIcon style={{ color: iconColor }} icon={icon} size={size} />
      </Dropdown.Toggle>

      {actions && (
        <Dropdown.Menu>
          {actions.map(item => (
            <Dropdown.Item
              style={{ color: textColor }}
              className='d-flex align-items-center justify-content-start gap-2'
              key={item.id}
              onClick={item.onClick} // Attach the onClick handler here
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};
