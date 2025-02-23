import React, { useEffect, useState } from 'react';
import { CardContainer, Layout } from '../../styles/Styles';
import { Col, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Chat } from '../../components/chat/Chat';
import {
  getAllUserService,
  getUsernameService,
} from '../../services/userService';
import { ChatCard } from '../../components/chatCard/ChatCard';
import { useAuth } from '../../contexts/AuthContext';

const socket = io(`${process.env.REACT_APP_BASE_URL}`);

export const ChatPage = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const { receiverId } = useParams();
  const { authState } = useAuth();
  const userId = authState?.userId;

  useEffect(() => {
    getUsernameService(receiverId)
      .then(response => {
        setUsername(response?.data?.username);
      })
      .catch(error => {
        console.log(error);
      });
  }, [receiverId]);

  useEffect(() => {
    getAllUserService()
      .then(response => {
        const filteredUsers = response.data.filter(user => user._id !== userId);
        setUsers(filteredUsers);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    if (userId) {
      socket.emit('join', { userId });

      socket.on('receiveMessage', message => {
        setMessages(prevMessages => {
          const userMessages = prevMessages[message.sender] || [];
          return {
            ...prevMessages,
            [message.sender]: [...userMessages, message],
          };
        });
      });

      return () => {
        socket.off('receiveMessage');
        socket.disconnect();
      };
    }
  }, [userId]);

  const handleUserSelect = user => {
    setSelectedUser(user);
  };

  const sendMessage = message => {
    if (selectedUser && userId) {
      console.log(selectedUser);
      const messageData = {
        sender: userId,
        senderUsername: authState?.username,
        receiver: selectedUser._id,
        message: message,
      };
      setMessages(prevMessages => {
        const userMessages = prevMessages[selectedUser._id] || [];
        return {
          ...prevMessages,
          [selectedUser._id]: [...userMessages, messageData],
        };
      });
      socket.emit('sendMessage', messageData);
    }
  };

  return (
    <Layout>
      <Row>
        <span className='back-btn' onClick={() => navigate('/home')}>
          <FontAwesomeIcon icon={faArrowLeft} size='2x' />
        </span>
      </Row>
      <Row className='pt-4 d-flex align-items-center justify-content-center'>
        <Col className='d-flex flex-column gap-2' xs={6}>
          <CardContainer maxHeight='20rem' width='75%' overflow='true'>
            {users.map(user => (
              <ChatCard key={user._id} user={user} setUser={handleUserSelect} />
            ))}
          </CardContainer>
        </Col>
        <Col xs={6}>
          {selectedUser && (
            <Chat
              selectedUsername={selectedUser.username}
              room={selectedUser._id}
              messages={messages[selectedUser._id] || []}
              sendMessage={sendMessage}
            />
          )}
        </Col>
      </Row>
    </Layout>
  );
};
