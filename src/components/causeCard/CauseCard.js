import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../contexts/AuthContext';

export const CauseCard = ({
  cause,
  showCauseModal,
  showConfirmationModal,
  goToChatPage,
  goToCausePage,
  goToRequests,
  requestJoin,
}) => {
  const { authState } = useAuth();

  return (
    <Card style={{ width: '23rem' }}>
      <Card.Img
        variant='top'
        height='200rem'
        src={`data:image/jpeg;base64,${cause?.image}`}
      />
      <Card.Body>
        <Card.Title>{cause?.title}</Card.Title>
        <Card.Text>{cause?.description}</Card.Text>
        <div className='d-flex align-items-center justify-content-end gap-2'>
          {authState?.role !== 'organization' && (
            <>
              {!cause?.status && (
                <Button
                  variant='success'
                  onClick={() => requestJoin(cause?._id)}
                >
                  Συμμετοχή
                </Button>
              )}
              {cause?.status === 'pending' ? (
                <b>Υπό επεξεργασία</b>
              ) : cause?.status === 'accepted' ? (
                <b>Αποδεχτή</b>
              ) : cause?.status === 'rejected' ? (
                <b>Ακυρωμένη</b>
              ) : (
                ''
              )}
              <Button variant='warning' onClick={() => goToChatPage()}>
                Μήνυμα
              </Button>
              <Button
                variant='primary'
                onClick={() => goToCausePage(cause?._id || cause?.causeId)}
              >
                Περισσότερα...
              </Button>
            </>
          )}
          {authState?.role === 'organization' && (
            <>
              <Button
                variant='success'
                onClick={() => goToRequests(cause?._id)}
              >
                Αιτήσεις
              </Button>
              <Button
                variant='warning'
                onClick={() => showCauseModal('edit', cause?._id)}
              >
                Επεξεργασία
              </Button>
              <Button
                variant='danger'
                onClick={() => showConfirmationModal(cause?._id)}
              >
                Διαγραφή
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
