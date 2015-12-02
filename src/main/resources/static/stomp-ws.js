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
            
            console.log(JSON.parse(serverMessage.body).content+"   entro que es estyo");
            labelModify.value=(JSON.parse(serverMessage.body).content);
        }
       
        });
        stompClient.subscribe('/topic/users',function(users){
            console.log("numro de usuario    "+ JSON.parse(users.body).length);
          showUsersConnected(JSON.parse(users.body));
        });
        
        stompClient.send("/app/messageActual",{},JSON.stringify({ 'name': user }));
		
        stompClient.send("/app/users",{});
        });
        
    }else{
       
        alert("el usuario no puede ser nulo");
    }
   
}
function showUsersConnected(ListUsers){
  
   
    var usersNow= "";
    var users= document.getElementById("usersActual");
    for (i=0; i<ListUsers.length; i++){
        usersNow=usersNow+"  | "+ ListUsers[i].name;
    }
    
    users.innerHTML=usersNow;
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
    var labelModify = document.getElementById('message');
    devPos();
    labelModify.value=(message);
    alert("RETRYTRUHRGEFAAGD  "+UpdateMath(message));
    UpdateMath(message);

 
}

function init() {
    var btnConnect = document.getElementById('connect');
    btnConnect.onclick=connect;
    var btnDisconnect = document.getElementById('disconnect');
    btnDisconnect.onclick=disconnect;
    disconnect();
}
window.onload = init;
