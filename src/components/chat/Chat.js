import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

export const Chat = ({ selectedUsername, room, messages, sendMessage }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState(messages);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  const handleSendMessage = () => {
    if (currentMessage !== '') {
      sendMessage(currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>{selectedUsername}</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent, index) => {
            console.log(messageContent);
            return (
              <div
                key={index}
                className='message'
                id={
                  selectedUsername === messageContent.senderUsername
                    ? 'other'
                    : 'you'
                }
              >
                <div>
                  <div className='message-content'>
                    <p>{messageContent.message}</p>
                  </div>
                  {/* <div className='message-meta'>
                    <p id='time'>{messageContent.timestamp}</p>
                    <p id='author'>{messageContent.selectedUsername}</p>
                  </div> */}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          value={currentMessage}
          placeholder='Hey...'
          onChange={event => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={event => {
            event.key === 'Enter' && handleSendMessage();
          }}
        />
        <button onClick={handleSendMessage}>&#9658;</button>
      </div>
    </div>
  );
};
