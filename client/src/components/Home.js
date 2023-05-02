import React, { useState, useEffect } from 'react';
import 'firebase/messaging';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import install from './installBTN';
import checkPWA from './checkPWA';
import requestPermission from './notificationOn';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';    

function Home( {socket} ){

    const navigate = useNavigate();
    const userId = uuidv4();

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const toastOption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };
    

    const handleValidation = () =>{
        if(room === ""){
          toast.error("Room required!", toastOption);
          return false;
        }else if(username.length === ""){
          toast.error("Username required", toastOption);
          return false;
        }
    
        return true;
    }  

    const webMobileDetection = function(){
        var element = document.getElementsByClassName("sendNoti");
        var installBtn = document.getElementsByClassName("installBtn");
        //var login = document.getElementsByClassName('loginChat');
        var login = document.getElementsByClassName("cssUser");

        if(window.matchMedia('(display-mode : standalone)').matches){
            //qui cosa vedo nell'applicazione
            if(element){
                installBtn[0].style.display = "none";
                localStorage.setItem("pwa-installed", "true");
               // showUsernameBox();
               

            }else{
                console.error("not found");
            }
        }else{
           if(element){
                //qua cosa vedo sul browser
                //element[0].style.display = "none";
                //login[0].style.display = "none";
                //login[0].style.display = "none"

            }else{
                console.error("not found in none");
            }
        }
    }

    function showNotiEnable(){
        var sendNoti = document.getElementsByClassName("sendNoti");
        if(Notification.permission==="granted"){
            sendNoti[0].classList.add('hidden');
            /*document.getElementsByClassName("username").disabled = false;
            document.getElementsByClassName("sendUser").disabled = false;*/
        }
    }

    function getSO(){
        var install = document.getElementsByClassName("sendNoti")

        if (navigator.userAgent.indexOf("Win") !== -1) {
            install[0].classList.remove('hidden');
        }
        if (navigator.userAgent.indexOf("Mac") !== -1) {
            install[0].classList.remove("hidden");
        }

        if (navigator.userAgent.indexOf("Linux") !== -1) {
            install[0].classList.remove('hidden');
        }

        if (navigator.userAgent.indexOf("Android") !== -1) {
            install[0].classList.remove('hidden');
        }
    }


    const joinRoom = async (e) =>{
        e.preventDefault();
        if(handleValidation()){
            socket.emit("join_room", room);
            saveOnDb();
            localStorage.setItem(`username_${userId}`, username);
            navigate(`/chat?userId=${userId}`);
        }
        
    };
  
    const saveOnDb = async (e) =>{
        //e.preventDefault();
    
        requestPermission().then((token) =>{
          const userToken = token;
          axios.post('http://localhost:3100/', {
            username: username,
            userToken: userToken
          })
      
        }).catch((err) =>{
          console.log(err);
        })
     }


    useEffect(() =>{
        checkPWA();
        webMobileDetection();
        showNotiEnable();
    },[]);




    return (
       <>
       <div>
            <button className='installBtn' onClick={install}> Install PWA</button>
            <p className="installText"> INSTALL THE PWA TO ACCESS ALL THE FEATURES </p>

            <button className="sendNoti permNoti" onClick={requestPermission}> ENABLE NOTIFICATION </button>
        </div><div>
                <div className='cssUser'>
                    <h3> JOIN CHAT</h3>
                    <input
                        type="text"
                        placeholder="John..."
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        } } />
                    <input
                        type="text"
                        placeholder='ROOM ID...'
                        value={room}
                        onChange={(e) => {
                            setRoom(e.target.value);
                        } } />
                    <button onClick={joinRoom} className='BTNchat chatBTN'> REGISTER </button>
                </div>
            </div>
           <ToastContainer/>
        </>       

     )
    

}

export default Home;