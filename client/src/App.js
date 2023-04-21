import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import io from 'socket.io-client';
import { useState } from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import Axios from 'axios';
import requestPermission from './components/notificationOn';
const socket = io.connect('http://localhost:3100');
var userToken = " ";


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{
      if(username !== "" && room !== ""){
          socket.emit("join_room", room);
          setShowChat(true);
      }
  };


 const saveOnDb = async (e) =>{
    e.preventDefault();

    requestPermission().then((token) =>{
      userToken = token;
      Axios.post('http://localhost:3100/', {
        username: username,
        userToken: userToken
      })
  
    }).catch((err) =>{
      console.log(err);
    })
 }


  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket}/>}></Route>
        </Routes>
      </div>

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
                  <button type="submit" onClick={saveOnDb} className='BTNchat chatBTN'> REGISTER </button>
                  <button onClick={joinRoom} className='BTNchat chatBTN'> JOIN A ROOM </button>
              </div>
          ) : (
              //<Chat socket={socket} username={username} room={room}/>
                <Routes>
                  <Route path="/" element={<Chat socket={socket} username={username} room={room}/>}></Route>
               </Routes>
          )}
      </div>
    </form>
    </BrowserRouter>

    
  );
}
//          

export default App;
