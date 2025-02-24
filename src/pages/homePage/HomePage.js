import React, { useEffect, useState } from 'react';
import { Layout } from '../../styles/Styles';
import { Button, Col, Row } from 'react-bootstrap';
import { CauseCard } from '../../components/causeCard/CauseCard';
import { CauseModal } from '../../modals/causeModal/CauseModal';
import {
  createService,
  deleteService,
  getAllService,
  getByIdService,
  getByUserService,
  requestJoinService,
  updateService,
} from '../../services/causeService';
import { useLoader } from '../../contexts/LoaderContext';
import { useToast } from '../../contexts/ToastContext';
import { ConfirmationModal } from '../../modals/confirmationModal/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const HomePage = () => {
  const [showCauseModal, setShowCauseModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [causeData, setCauseData] = useState({});
  const [causes, setCauses] = useState([]);
  const [causeId, setCauseId] = useState(null);
  const [editObj, setEditObj] = useState({});
  const [mode, setMode] = useState('');
  const { showLoader, hideLoader } = useLoader();
  const { showSuccess, showError } = useToast();
  const { authState } = useAuth();
  const navigate = useNavigate();

  // set values in causeData object
  const handleFieldChange = event => {
    const { name, value, files } = event.target;
    if (files) {
      setCauseData(prevCauseData => ({
        ...prevCauseData,
        [name]: files[0], // Store the file object
      }));
    } else {
      setCauseData(prevCauseData => ({
        ...prevCauseData,
        [name]: value,
      }));
    }
  };

  // create a cause function
  const createCause = () => {
    const data = new FormData();
    for (const key in causeData) {
      data.append(key, causeData[key]);
    }
    setShowCauseModal(false);
    showLoader();
    createService(data)
      .then(response => {
        hideLoader();
        showSuccess();
        setRefreshFlag(prevFlag => !prevFlag);
      })
      .catch(error => {
        console.log(error);
        hideLoader();
        showError();
      });
  };

  // update a cause function
  const updateCause = id => {
    setShowCauseModal(false);
    showLoader();
    updateService(id, causeData)
      .then(response => {
        console.log(response);
        hideLoader();
        showSuccess();
        setRefreshFlag(prev => !prev);
      })
      .catch(error => {
        console.log(error);
        hideLoader();
        showError();
      });
  };

  // delete a cause func
  const deleteCause = () => {
    showLoader();
    setShowConfirmationModal(false);
    deleteService(causeId)
      .then(response => {
        console.log(response);
        hideLoader();
        showSuccess();
        setRefreshFlag(prev => !prev);
      })
      .catch(error => {
        console.log(error);
        hideLoader();
        showError();
      });
  };

  // open cause modal
  const handleOpenCauseModal = (mode, objId = null) => {
    setMode(mode);
    if (mode === 'edit') {
      getByIdService(objId)
        .then(response => {
          setEditObj(response.data);
          setShowCauseModal(true);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setEditObj({});
      setShowCauseModal(true);
    }
  };

  // request to join in an organization
  const requestJoin = causeId => {
    showLoader();
    requestJoinService(causeId)
      .then(response => {
        setRefreshFlag(prev => !prev);
        showSuccess();
        hideLoader();
      })
      .catch(error => {
        showError();
        hideLoader();
      });
  };

  // open confirmarion modal
  const handleOpenConfirmation = id => {
    setCauseId(id);
    setShowConfirmationModal(true);
  };

  // go to chat page
  const goToChatPage = receiverId => {
    navigate('/chat');
  };

  // go to cause page
  const goToCausePage = id => {
    navigate('/cause/' + id);
  };

  // render every time when a cause updated or a cause added or a cause deleted
  useEffect(() => {
    // get causes
    if (authState?.role === 'user') {
      const getAllCauses = () => {
        showLoader();
        getAllService()
          .then(response => {
            setCauses(response.data);
            hideLoader();
          })
          .catch(error => {
            console.log(error);
            hideLoader();
          });
      };
      getAllCauses();
    } else if (authState?.role === 'organization') {
      const getCausesByUser = () => {
        showLoader();
        getByUserService()
          .then(response => {
            setCauses(response.data);
            hideLoader();
          })
          .catch(error => {
            console.log(error);
            hideLoader();
          });
      };
      getCausesByUser();
    }
  }, [refreshFlag, authState?.role]);

  return (
    <Layout>
      <Row className='pb-4'>
        <Col
          sm={12}
          className='d-flex align-items-center justify-content-between w-100'
        >
          <h4>Εκδηλώσεις({causes?.length})</h4>
          {authState?.role === 'organization' && (
            <Button
              variant='success'
              onClick={() => handleOpenCauseModal('add')}
            >
              Προσθήκη
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        {causes?.map(cause => (
          <Col className='pt-4' sm={4} key={cause._id}>
            <CauseCard
              cause={cause}
              showCauseModal={handleOpenCauseModal}
              showConfirmationModal={handleOpenConfirmation}
              goToChatPage={goToChatPage}
              goToCausePage={goToCausePage}
              requestJoin={requestJoin}
            />
          </Col>
        ))}
      </Row>
      <CauseModal
        show={showCauseModal}
        mode={mode}
        editObj={editObj}
        onChange={handleFieldChange}
        handleClose={() => setShowCauseModal(false)}
        createFunc={createCause}
        updateFunc={updateCause}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        title='Διαγραφή εκδήλωσης'
        body='Είστε σίγουροι ότι θέλετε να διαγράψετε τη συγκεκριμένη εκδήλωση;'
        onCallback={deleteCause}
      />
    </Layout>
  );
};
