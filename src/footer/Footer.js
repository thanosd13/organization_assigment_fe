import React from 'react';
import { GRAY } from '../constants/ColorsTypes';

export const Footer = () => {
  return (
    <footer
      style={{ background: GRAY }}
      className='text-white text-center py-3'
    >
      <div className='container'>
        <p className='mb-0 font-weight-bold footer-p'>
          © 2025 organization_assignment. All Rights Reserved.
        </p>
        <div className='d-flex justify-content-center'>
          <a href='#' className='text-white mx-2'>
            <i className='fab fa-facebook-f'></i>
          </a>
          <a href='#' className='text-white mx-2'>
            <i className='fab fa-twitter'></i>
          </a>
          <a href='#' className='text-white mx-2'>
            <i className='fab fa-instagram'></i>
          </a>
          <a href='#' className='text-white mx-2'>
            <i className='fab fa-linkedin-in'></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
