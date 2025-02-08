import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { useLoader } from '../../contexts/LoaderContext';
import { BLUE } from '../../constants/ColorsTypes';
import { Layout } from '../../styles/Styles';

export const Loader = () => {
  const { loading } = useLoader();
  if (!loading) return null;
  return (
    <Layout
      className='d-flex align-items-center justify-content-center position-fixed z-3 top-0 start-0 end-0 bottom-0'
      style={{ zIndex: 10000 }}
    >
      <PropagateLoader color={BLUE} />
    </Layout>
  );
};
