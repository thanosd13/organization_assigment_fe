import React, { useEffect, useState } from 'react';
import { Layout } from '../../styles/Styles';
import { Button, Col, Row } from 'react-bootstrap';
import { CauseCard } from '../../components/causeCard/CauseCard';
import { CauseModal } from '../../modals/causeModal/CauseModal';
import {
  createService,
  deleteService,
  getByIdService,
  getByUserService,
  updateService,
} from '../../services/causeService';
import { useLoader } from '../../contexts/LoaderContext';
import { useToast } from '../../contexts/ToastContext';
import { ConfirmationModal } from '../../modals/confirmationModal/ConfirmationModal';

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

  // open confirmarion modal
  const handleOpenConfirmation = id => {
    setCauseId(id);
    setShowConfirmationModal(true);
  };

  // render every time when a cause updated or a cause added or a cause deleted
  useEffect(() => {
    // get causes
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
  }, [refreshFlag]);

  return (
    <Layout>
      <Row className='pb-4'>
        <Col
          sm={12}
          className='d-flex align-items-center justify-content-between w-100'
        >
          <h4>Εκδηλώσεις({causes?.length})</h4>
          <Button variant='success' onClick={() => handleOpenCauseModal('add')}>
            Προσθήκη
          </Button>
        </Col>
      </Row>
      <Row>
        {causes?.map(cause => (
          <Col className='pt-4' sm={4} key={cause._id}>
            <CauseCard
              cause={cause}
              showCauseModal={handleOpenCauseModal}
              showConfirmationModal={handleOpenConfirmation}
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
