/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var stompClient = null;
function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
<<<<<<< HEAD
<<<<<<< HEAD
 
    document.getElementById('imagenPrincipal').style.visibility= !connected ? 'visible' : 'hidden';
=======
  //  document.getElementById('response').innerHTML = '';
  //  document.getElementById('imagenPrincipal').style.visibility= !connected ? 'visible' : 'hidden';
>>>>>>> con usuarios sin concurrencia
=======
  //  document.getElementById('imagenPrincipal').style.visibility= !connected ? 'visible' : 'hidden';
>>>>>>> master
    document.getElementById('user').disabled= connected;
}   
function connect() {
    
    var user =document.getElementById("user").value;
    if (user!=""){
         var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function(serverMessage){
        console.log(JSON.parse(serverMessage.body).userMessage.name+"    esto es lo que entro");
        if(JSON.parse(serverMessage.body).userMessage.name != user){
             //console.log(JSON.parse(serverMessage.body).sendTo+" marico");
             
             showServerMessage(JSON.parse(serverMessage.body).content);

        }else{
            console.log("soy yooo");
            
            var labelModify = document.getElementById('message');
            //var response=document.getElementById('response');
            console.log(JSON.parse(serverMessage.body).content+"   entro que es estyo");
            labelModify.value=(JSON.parse(serverMessage.body).content);
            //UpdateMath(JSON.parse(serverMessage.body).content);
            //response.value=(JSON.parse(serverMessage.body).content);
        }
       
        });
        stompClient.subscribe('/topic/users',function(users){
          //alert(JSON.parse(users.body));  
          showUsersConnected(JSON.parse(users.body));
        });
        
        stompClient.send("/app/messageActual",{},JSON.stringify({ 'name': user }));
		//alert(actual.getMessage());
        stompClient.send("/app/users",{});
        });
        
    }else{
       
        alert("el usuario no puede ser nulo");
    }
   
}
function showUsersConnected(ListUsers){
   // alert(ListUsers[0].name);
   console.log("trejdsfksdjfksld s"+ListUsers);
    var usersNow= "";
    var users= document.getElementById("users");
    for (i=0; i<ListUsers.length; i++){
        usersNow=usersNow+"  | "+ ListUsers[i].name;
    }
    console.log("maricon truiple hpta     "+usersNow);
    users.value=usersNow;
}   
    
function disconnect() {
    var user =document.getElementById("user").value;
    if (stompClient != null) {
    stompClient.send("/app/usersDelete",{},JSON.stringify({'name': user }));
    stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}


function devPos(){ 
    input=document.getElementById('message'); 
    if(typeof document.selection != 'undefined' && document.selection && typeof input.selectionStart == 'undefined'){ 

        var str =document.selection.createRange(); 
        stored_range = str.duplicate(); 
        stored_range.moveToElementText(input); 
        stored_range.setEndPoint( 'EndToEnd', str ); 
        input.selectionStart = stored_range.text.length - str.text.length; 
        input.selectionEnd = input.selectionStart + str.text.length; 
        setCaretPosition(input,input.selectionStart);
        
    }else if(typeof input.selectionStart != 'undefined'){ 
        //alert(input.selectionStart); 
    } 
} 


function setCaretPosition(elemId, caretPos) {
    

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}



function sendMessage() {
    var message = document.getElementById('message').value;
    var user = document.getElementById('user').value;
    var userMessageT={'name':user};
    stompClient.send("/app/message", {}, JSON.stringify({ 'message': message,'userMessage':userMessageT }));
}
function showServerMessage(message) {
	//alert(message);
    //var response = document.getElementById('response');
    var labelModify = document.getElementById('message');
    devPos();
	//UpdateMath(message);
   // response.value=(message);
    labelModify.value=(message);
    UpdateMath(message);
   
    //var p = document.createElement('p');
    //p.style.wordWrap = 'break-word';
    //p.appendChild(document.createTextNode(message));
    //response.appendChild(p);
}

function init() {
 //   var btnSend = document.getElementById('send');
   // btnSend.onclick=sendMessage;
   
    var btnConnect = document.getElementById('connect');
    btnConnect.onclick=connect;
    var btnDisconnect = document.getElementById('disconnect');
    btnDisconnect.onclick=disconnect;
    disconnect();
}
window.onload = init;



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


