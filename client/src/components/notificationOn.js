import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAkPsE3jPQywZIzB4DIoqWaas6W-l6bJkk",
    authDomain: "pushnoti-9bd26.firebaseapp.com",
    databaseURL: "https://pushnoti-9bd26-default-rtdb.firebaseio.com",
    projectId: "pushnoti-9bd26",
    storageBucket: "pushnoti-9bd26.appspot.com",
    messagingSenderId: "9373725090",
    appId: "1:9373725090:web:f98fc9381d406c2b9bc2fb",
    measurementId: "G-YEWD5QDSSY"
};


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const database = getDatabase(app);
const USERS = ref(database, 'Tokens/');
var token ='';


const getFCMToken = async () => {
    await getToken(messaging, {vapid: "BLmfEuPd7yJk2IPFzLCF1aRAbHRcjf-tyfmN6aZ-u5vAYAWSJgWuXsZyrX55aoPfAuuosZ8rbO3j0AR22L5pY6I"}).then((a) => {token = a})
    return token;
}

const showFCMToken = async () =>{
    await getFCMToken();
    console.log(token);
    
}


const addUserDB = async (value) =>{
    const username = value;
    console.log(username);
    USERS.ref(`Tokens/${username}`).set(await getFCMToken())
        .then(()=>{
            console.log("inserita correttamente");
        })
        .catch((error) =>{
            console.log(error);
        })
    return username;
}

/*
const getUsers = () => {
    return new Promise((resolve, reject) => {
        USERS.once('value', (snapshot) => {
            var usersArr = [];
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                usersArr.push(childKey);
            })
            console.log("stampa array ", usersArr);
            resolve(usersArr);
        })
    })

}
const requestPermission = () =>{
        admin.messaging().requestPermission().then(async () => {
        token = await getFCMToken();
        window.location.reload(true);
    }).catch((err) => {
        alert("You've blocked the notifications. Please check your browser settings");
        
    });
}
*/

/*const requestPermission = async () =>{
   return Promise.resolve(Notification.requestPermission()).then(async function(permission){
        token = await getFCMToken();
        window.location.reload(true);
    })
}*/
/*
const requestPermission = async () =>{
    try{
        messaging.messaging().requestPermission()
            .then(async () =>{
                token = await getFCMToken();
                window.location.reload(true);
            })
    }catch (error){
        if(error instanceof TypeError){
            Notification.requestPermission(async () =>{
                token = await getFCMToken();
                window.location.reload(true);
            });
        }else{
            throw error;
        }
    }

}*/

/*const requestPermission = () =>{
    Notification.requestPermission().then(async () => {
    token = await getFCMToken();
    //window.location.reload(true);
    console.log("valore token in req", token);
    return token;
}).catch((err) => {
    alert("You've blocked the notifications. Please check your browser settings");
    
});
}*/

const requestPermission = () => {
    return new Promise((resolve, reject) => {
      Notification.requestPermission()
        .then(async () => {
          const token = await getFCMToken();
          console.log("valore token in req", token);
          resolve(token);
        })
        .catch((err) => {
          alert("You've blocked the notifications. Please check your browser settings");
          reject(err);
        });
    });
  };





if(Notification.permission==="granted"){
    showFCMToken();
}


export default requestPermission;
