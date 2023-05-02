/*import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import { useLocation } from 'react-router-dom';

function Chat( {socket} ){
    const location = useLocation();
    const searchValues = new URLSearchParams(location.search);

    const username = searchValues.get('username');
    const room = searchValues.get('room');

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async() =>{
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: 
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) =>[...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);

    return(
        <p>  </p>
  );
}

export default Chat;
*/

import React, { useEffect, useState } from 'react';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';


const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    useEffect(() =>{
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    })

    return (
        <div className="chat">
        <div className="chat__main">
            <ChatBody messages = {messages}/>
            <ChatFooter socket={socket} />
        </div>
        </div>
    );
};

export default ChatPage;