import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../styles/Styles';
import { Col, Row } from 'react-bootstrap';
import { getByIdService } from '../../services/causeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const CausePage = () => {
  const [cause, setCause] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getByIdService(id)
      .then(response => {
        setCause(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <Layout>
      <Row>
        <span className='back-btn' onClick={() => navigate('/home')}>
          <FontAwesomeIcon icon={faArrowLeft} size='2x' />
        </span>
      </Row>
      <Row className='p-4'>
        <Col xs={6}>
          <img
            className='cause-img'
            src={`data:image/jpeg;base64,${cause?.image}`}
            alt='cause'
          />
        </Col>
        <Col xs={6}>
          <h3>{cause?.title}</h3>
          <p>{cause?.description}</p>
        </Col>
      </Row>
    </Layout>
  );
};
