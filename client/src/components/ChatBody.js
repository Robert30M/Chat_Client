import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const ChatBody = ( {messages }) => {
    const location = useLocation();
    const searchValues = new URLSearchParams(location.search);

    const userId = searchValues.get('userId');
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem(`username_${userId}`);
        navigate('/');
        window.location.reload();
    };

    return (
        <>
        <header className="chat__mainHeader">
            <p>Hangout with Colleagues</p>
            <button className="leaveChat__btn" onClick={handleLeaveChat}>
            LEAVE CHAT
            </button>
        </header>

        {/*This shows messages sent from you*/}
        <div className="message__container">
            {messages.map((message) => {
                if (message.name === localStorage.getItem(`username_${userId}`)) {
                return (
                    <div className="message__chats" key={message.id}>
                    <p className="sender__name">You</p>
                    <div className="message__sender">
                        <p>{message.text}</p>
                    </div>
                    </div>
                );
                } else {
                return (
                    <div className="message__chats" key={message.id}>
                    <p className="sender__name">{message.name}</p>
                    <div className="message__recipient">
                        <p>{message.text}</p>
                    </div>
                    </div>
                );
                }
            })}
            <div className="message__status">
                <p>Someone is typing...</p>
            </div>
            </div>
        </>
    );
    };

export default ChatBody;