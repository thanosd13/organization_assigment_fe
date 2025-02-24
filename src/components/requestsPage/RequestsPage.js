import React, { useEffect, useState } from 'react';
import { Layout } from '../../styles/Styles';
import { Col, Row } from 'react-bootstrap';
import { useLoader } from '../../contexts/LoaderContext';
import { useToast } from '../../contexts/ToastContext';
import { getRequestedCausesFromUserService } from '../../services/causeService';
import { CauseCard } from '../causeCard/CauseCard';
import { useNavigate } from 'react-router-dom';

export const RequestsPage = () => {
  const [causes, setCauses] = useState([]);
  const { showLoader, hideLoader } = useLoader();
  const { showError } = useToast();
  const navigate = useNavigate();

  // go to chat page
  const goToChatPage = () => {
    navigate('/chat');
  };

  // go to cause page
  const goToCausePage = id => {
    navigate('/cause/' + id);
  };

  useEffect(() => {
    showLoader();
    getRequestedCausesFromUserService()
      .then(response => {
        setCauses(response?.data[0]?.causes);
        hideLoader();
      })
      .catch(error => {
        showError();
        hideLoader();
      });
  }, []);

  useEffect(() => {});
  return (
    <Layout>
      <Row className='pb-4'>
        <Col
          sm={12}
          className='d-flex align-items-center justify-content-between w-100'
        >
          <h4>Αιτήσεις({causes?.length})</h4>
        </Col>
      </Row>
      <Row>
        {causes?.map(cause => (
          <Col className='pt-4' sm={4} key={cause._id}>
            <CauseCard
              cause={cause}
              goToChatPage={goToChatPage}
              goToCausePage={goToCausePage}
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};
