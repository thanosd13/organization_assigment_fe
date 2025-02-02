import React from 'react';
import logo from '../../assets/images/logo.png';

export const Logo = ({ style, height = '100px', width = '100px' }) => {
  return (
    <div className={style} style={{ height: height, width: width }}>
      <img
        src={logo}
        alt='logo'
        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};
