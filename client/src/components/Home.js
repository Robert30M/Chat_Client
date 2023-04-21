import React, { useState, useEffect } from 'react';
import 'firebase/messaging';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import install from './installBTN';
import checkPWA from './checkPWA';
import requestPermission from './notificationOn';
import Login from './Login';

function Home( {socket} ){

    const webMobileDetection = function(){
        var element = document.getElementsByClassName("sendNoti");
        var installBtn = document.getElementsByClassName("installBtn");
        //var login = document.getElementsByClassName('loginChat');

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



    useEffect(() =>{
        checkPWA();
        webMobileDetection();
        showNotiEnable();
    },[]);




    return (
        <div>
            <button className='installBtn' onClick={install}> Install PWA</button>
            <p className="installText" > INSTALL THE PWA TO ACCESS ALL THE FEATURES </p>
            
            <button className="sendNoti permNoti" onClick={requestPermission}> ENABLE NOTIFICATION </button>
        </div>

    
     )
    

}

export default Home;