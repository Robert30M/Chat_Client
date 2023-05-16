const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

mongoose.connect("link mongodb", { useNewUrlParser: true, useUnifiedTopology: true});
app.use(cors());

const server = http.createServer(app);


const socketIO = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


socketIO.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

socketIO.on("connection", (socket) =>{
    console.log(`User connected id: ${socket.id}`);

    /*socket.on("join_room", (data) =>{
        socket.join(data);
    })*/

    socket.on('typing', (data) => socket.emit('typingResponse', data));

    socket.on('message',(data) =>{
        socketIO.emit('messageResponse', data);
        console.log("sono qua");
        sendNotification(data);
    })

    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id);
        socket.disconnect();
    })
})




const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    userToken: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', UserSchema);
User.createIndexes();

app.get("/api", (req, res) =>{
    res.json({
        message: "Hello World",
    });
});



app.post("/", async(req, res) =>{
    console.log("valore user", req.body.username);
    console.log("valore token", req.body.userToken);

    const user = new User({
        username: req.body.username,
        userToken: req.body.userToken
    });

    try{
        await user.save();
        res.send("inserted...");
    }catch(err){
        console.log(err);
    }
})


async function sendNotification(data){
    const result = await User.find({}, {userToken: 1});
    const tokens = result.map(doc => doc.userToken);
    const message = data.text;
    const payload = {
        notification: {
            'title': data.name,
            'body': message,
        }
    };

    const options = {
        priority: "high"
    }

    tokens.forEach((token) =>{
        admin.messaging().sendToDevice(token, payload, options)
        .catch(error => {
            console.log(error);
        })
    })
}



server.listen(3100, () =>{
    console.log(`Server listen`);
});