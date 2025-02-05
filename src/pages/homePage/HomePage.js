import React, { useState } from 'react';
import { Layout } from '../../styles/Styles';
import { Button, Col, Row } from 'react-bootstrap';
import { CauseCard } from '../../components/causeCard/CauseCard';
import homeless_food from '../../assets/test_images/homeless_food.jpg';
import homeless_clothes from '../../assets/test_images/homeless_clothes.jpg';
import { CauseModal } from '../../modals/causeModal/CauseModal';
import { createService } from '../../services/causeService';

export const HomePage = () => {
  const [showCauseModal, setShowCauseModal] = useState(false);

  const [causeData, setCauseData] = useState({});

  // set values in causeData object
  const handleFieldChange = event => {
    setCauseData({
      ...causeData,
      [event.target.name]: event.target.value,
    });
  };

  // create a cause function
  const createCause = () => {
    createService(causeData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <Row className='pb-4'>
        <Col
          sm={12}
          className='d-flex align-items-center justify-content-between w-100'
        >
          <h4>Εκδηλώσεις(10)</h4>
          <Button variant='success' onClick={() => setShowCauseModal(true)}>
            Προσθήκη
          </Button>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <CauseCard
            title='Δωρεά φαγητού σε αστέγους'
            text='Την Κυριακή 20/07 οργανώνουμε ημέρα παράδοσης φαγητού σε ανθρώπους που το έχουν ανάγκη...'
            image={homeless_food}
          />
        </Col>
        <Col sm={4}>
          <CauseCard
            title='Δωρεά ενδυμασίας σε αστέγους'
            text='Την Κυριακή 20/07 οργανώνουμε ημέρα παράδοσης φαγητού σε ανθρώπους που το έχουν ανάγκη...'
            image={homeless_clothes}
          />
        </Col>
        <Col sm={4}>
          <CauseCard
            title='Δωρεά φαγητού σε αστέγους'
            text='Την Κυριακή 20/07 οργανώνουμε ημέρα παράδοσης φαγητού σε ανθρώπους που το έχουν ανάγκη...'
            image={homeless_food}
          />
        </Col>
      </Row>
      <CauseModal
        show={showCauseModal}
        onChange={handleFieldChange}
        handleClose={() => setShowCauseModal(false)}
        createFunc={createCause}
      />
    </Layout>
  );
};
