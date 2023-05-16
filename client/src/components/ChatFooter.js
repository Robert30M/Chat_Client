import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


const ChatFooter = ( {socket} ) => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const searchValues = new URLSearchParams(location.search);

  const userId = searchValues.get('userId');

  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('username')} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(message.trim() && localStorage.getItem(`username_${userId}`)){
        socket.emit('message', {
            text: message,
            name: localStorage.getItem(`username_${userId}`),
            room: localStorage.getItem('room'),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        })
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;