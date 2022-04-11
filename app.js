const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors=require("cors")
var user=[]
var mess=[]
var total=0
// Middlewares
app.use(cors({
  origin:"*",
}))
app.use(express.static("public"));
var bodyParser = require('body-parser');
const { use } = require("express/lib/application");
app.use(bodyParser.json()); // for parsing application/json
// Templating engine setup
app.set("view engine", "ejs");

// Enpoints
app.get("/", (req, res) => {
  res.render("index");
});
  //obtener mensajes
  app.get("/mes", (req, res) => {
    try {
      res.json(mess); 
    } catch (error) {
      res.status(400)
      res.json({response:"something bad happen"})
    }  
  });
    //obtener id
app.post("/user", (req, res) => {
  try {
    res.json({name:findUser(req.body.id)}); 
  } catch (error) {
    res.status(400)
    res.json({response:"something bad happen"})
  }  
});
//cambiar nombre
app.put("/user", (req, res) => {
  try {
    changeName(req.body)
    res.json({message:"all well"}); 
  } catch (error) {
    res.status(400)
    res.json({response:"something bad happen"})
  }  
});

//al about socket
  io.on('connection', (socket) => {    
    console.log('New user connected, total of current user are:'+(total+=1));
    user.push([socket.id, user.length+1]) 
    console.log(user)
    socket.on('disconnect', () => {
      console.log('user disconnected, total of current user are:'+(total-=1));
    });
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log(socket.id)
      mess.push({user:findUser(socket.id), message:msg})
      console.log(mess)
      io.emit('chat message', [findUser(socket.id),msg]);
    });
  });
  // Starting server.
  server.listen(3000, () => {
    console.log("Listening on port 3000...");
  });

  function findUser(id){
    let name=''
    user.map((element)=>{
      element[0]===id&& (name=element[1])
    })
    return name
  } 
  function changeName(data){
    console.log(data)
    user.map((element)=>{
      String(element[1])===String(data.before)&&(element[1]=data.after)
    })
    console.log(user)
  }
