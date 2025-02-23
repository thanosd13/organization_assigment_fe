import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';

const socket = io(`${process.env.REACT_APP_BASE_URL}`);

export const ChatPageTest = () => {
  const { receiverId } = useParams();
  const { authState } = useAuth();
  const userId = authState?.userId;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(receiverId);

  useEffect(() => {
    if (userId) {
      socket.emit('join', { userId });

      socket.on('receiveMessage', message => {
        console.log(message);
        setMessages(prevMessages => [...prevMessages, message]);
      });

      return () => {
        socket.off('receiveMessage');
        socket.disconnect();
      };
    }
  }, [userId]);

  const sendMessage = () => {
    if (message.trim() && receiver) {
      const newMessage = {
        sender: userId,
        receiver,
        message,
      };

      socket.emit('sendMessage', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Receiver ID'
        value={receiver}
        onChange={e => setReceiver(e.target.value)}
      />
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type='text'
        placeholder='Type a message'
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
