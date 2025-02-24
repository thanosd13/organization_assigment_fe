import React, { useEffect, useState } from 'react';
import { Layout } from '../../styles/Styles';
import DataTable from 'react-data-table-component';
import { BLUE_DARK, CIEL } from '../../constants/ColorsTypes';
import { DropDownMenu } from '../../components/dropDownMenu/DropDownMenu';
import { faBars, faCancel, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  getUsersFromCauseService,
  updateStatusService,
} from '../../services/causeService';
import { useParams } from 'react-router-dom';
import { useLoader } from '../../contexts/LoaderContext';

export const RequestsOrgPage = () => {
  const [users, setUsers] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { causeId } = useParams();
  const { showLoader, hideLoader } = useLoader();

  // update status
  const updateStatus = (status, userId) => {
    console.log('here');
    showLoader();
    updateStatusService({ causeId: causeId, userId: userId, status: status })
      .then(response => {
        console.log(response);
        hideLoader();
        setRefreshFlag(prevFlag => !prevFlag);
      })
      .catch(error => {
        console.log(error);
        hideLoader();
      });
  };

  // data table actions
  const customStyles = {
    headRow: {
      style: {
        background: CIEL,
      },
    },
  };

  const getActions = row => [
    {
      id: 1,
      name: 'Αποδοχή',
      icon: faCheck,
      onClick: () => updateStatus('accepted', row.userId),
    },
    {
      id: 2,
      name: 'Απόρριψη',
      icon: faCancel,
      onClick: () => updateStatus('rejected', row.userId),
    },
  ];

  const columns = [
    {
      name: 'Όνομα Χρήστη',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Όνομα',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Επίθετο',
      selector: row => row.surname,
      sortable: true,
    },
    {
      name: 'E-mail',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Ηλικια',
      selector: row => row.age,
      sortable: true,
    },
    {
      name: 'Κατάσταση Αίτησης',
      selector: row =>
        row.status === 'pending'
          ? 'Υπό επεξεργασία'
          : row.status === 'accepted'
          ? 'Αποδεκτή'
          : row.status === 'rejected'
          ? 'Ακυρωμένη'
          : '',
      sortable: true,
    },
    {
      name: 'Ενέργειες',
      cell: row => (
        <div>
          <DropDownMenu
            icon={faBars}
            textColor={BLUE_DARK}
            iconColor={BLUE_DARK}
            actions={getActions(row)}
          />
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: '163px',
    },
  ];

  useEffect(() => {
    getUsersFromCauseService(causeId)
      .then(response => {
        setUsers(response.data[0]?.users);
      })
      .catch(error => {
        console.log(error);
      });
  }, [causeId, refreshFlag]);

  return (
    <Layout>
      <DataTable
        columns={columns}
        data={users}
        pagination
        paginationPerPage={5}
        customStyles={customStyles}
        paginationRowsPerPageOptions={[2, 3, 4, 5]}
      />
    </Layout>
  );
};
