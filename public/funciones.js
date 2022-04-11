const url='http://localhost:3000/user'
let soy=''
var socket = io();
socket.on('connect',()=>{
  console.log(`conectado con id: ${socket.id}`)
  getUser()
})
var form = document.getElementById('form');
var input = document.getElementById('input');
var padre=document.getElementById("content")

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
    var nuevo=document.createElement("div");
    nuevo.classList= String(soy)===String(msg[0])?("col-auto offset-6 alert alert-info rounded-pill text-end"):("col-6 alert alert-success rounded-pill text-start");    
    nuevo.textContent = String(soy)===String(msg[0])?(msg[1]):(msg[0]+": "+msg[1]);  
    padre.appendChild(nuevo)
    window.scrollTo(0, document.body.scrollHeight);

}); 
socket.on('Reset', function(msg) {
    padre.innerHTML = '';
}); 
//Get name
function getUser(){
    const Http = new XMLHttpRequest();        
    Http.open('POST', url);  
    Http.setRequestHeader("Accept", "application/json");
    Http.setRequestHeader('Content-Type','application/json');
    Http.send(JSON.stringify({id:socket.id}));
    Http.onreadystatechange = function(){
    if (this.readyState==4 && this.status==200) {
        data=(JSON.parse(Http.responseText)).name         
        soy=data
        document.getElementById('usuario').textContent=" "+data
    }else if(this.readyState==4 && this.status==400) {
        cdata=JSON.parse(Http.responseText)
        console.log(cdata)          
    }                
    }
  }
  //update name
  function changeName(){      
      nuevo=document.getElementById("message-text").value
      console.log(nuevo)
     const Http = new XMLHttpRequest();        
    Http.open('PUT', url);  
    Http.setRequestHeader("Accept", "application/json");
    Http.setRequestHeader('Content-Type','application/json');
    Http.send(JSON.stringify({before:soy, after:nuevo}));
    Http.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200) {
            data=JSON.parse(Http.responseText)      
            console.log(data)
            soy=nuevo
            document.getElementById('usuario').textContent=" "+nuevo
        }else if(this.readyState==4 && this.status==400) {
            cdata=JSON.parse(Http.responseText)
            console.log(cdata)          
        }                
    } 
  }

