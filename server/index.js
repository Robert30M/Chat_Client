const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
app.use(cors());

mongoose.connect("mongodb+srv://chatDB:puqEAqa521Bupkwt@chatcluster.pevilok.mongodb.net/chatUsers?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

const server = http.createServer(app);

const socketIO = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

socketIO.on("connection", (socket) =>{
    console.log(`User connected id: ${socket.id}`);
    socket.on('send_message', (data) =>{
        socketIO.emit('receive_message', data);
    })

    socket.on('message',(data) =>{
        socketIO.emit('messageResponse', data);
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
    console.log("valore room", req.body.userToken);

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



/*
app.post("/", async (req, resp) =>{
    console.log("dentro post");
    try{
        const user = new User(req.body);
        console.log("dati dell'utente ", req.body);
        let result = await user.save();
        result = result.toObject();
        resp.send(result);
        /*if(result){
            delete result.password;
            resp.send(result);
            console.log(result);
        }else{
            console.log("User already registered");
        }
    } catch(e){
        resp.status(500).json({error: "Something Went Wrong"});
    }
})
/*
app.post('/', async (req, res) => {
    try {
        console.log("valore body",req.body);
      const { username, room } = req.body;
      const collection = client.db('chatUsers').collection('users');
      const result = await collection.insertOne({ username, room });
      res.json(result.ops[0]);
    } catch (err) {
      console.error('Failed to insert user:', err);
      res.status(500).json({ error: 'Failed to insert user' });
    }
  });
*/

server.listen(3100, () =>{
    console.log(`Server listen`);
})