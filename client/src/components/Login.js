/*import Chat from './Chat';
import { useState } from 'react';
import io from 'socket.io-client';

function Login(){
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const socket = io.connect('http://localhost:3100');

    const joinRoom = () =>{
        if(username !== "" && room !== ""){
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    const saveOnDb = async (e) =>{
        e.preventDefault();
        let result = await fetch(
            'http://localhost:3000/', {
                method: "post", 
                body: JSON.stringify({username, room}), //aggiungo temporaneamente room solo per provare poi ci va messo il token
                headers: {
                    'Content-Type': 'application/json'
                }
        })

        result = await result.json();
        console.warn(result);
        if(result) {
            alert("Data saved succesfully");
            setRoom("");
            setUsername("");
        }
    }



    return(
        <form action="">    
            <div>
                {!showChat ? (
                    <div className='cssUser'>
                        <h3> JOIN CHAT</h3>
                        <input
                                type="text"
                                placeholder="John..."
                                value = {username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder='ROOM ID...'
                            value = {room}
                            onChange={(e) =>{
                                setRoom(e.target.value);
                            }}
                        />
                        <button type="submit" onClick={() => { saveOnDb(); joinRoom() }} className='BTNchat chatBTN'> JOIN A ROOM </button>
                    </div>
                ) : (
                    <Chat socket={socket} username={username} room={room}/>
                )}
            </div>
        </form>
    )
}

export default Login;
*/