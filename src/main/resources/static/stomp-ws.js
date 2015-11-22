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
    document.getElementById('response').innerHTML = '';
    document.getElementById('imagenPrincipal').style.visibility= !connected ? 'visible' : 'hidden';
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
        //alert(JSON.parse(serverMessage.body).sendTo);
        if(JSON.parse(serverMessage.body).sendTo != user){
             showServerMessage(JSON.parse(serverMessage.body).content);

        }else{
            console.log("soy yooo");
            var labelModify = document.getElementById('message');
            var response=document.getElementById('response');
            labelModify.value=(JSON.parse(serverMessage.body).content);
            response.value=(JSON.parse(serverMessage.body).content);
        }
       
        });
        stompClient.send("/app/messageActual",{},JSON.stringify({ 'string': user }));
       // alert(actual.getMessage());
        });
    }else{
       
        alert("el usuario no puede ser nulo");
    }
   
}
    
    
function disconnect() {
    if (stompClient != null) {
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
    stompClient.send("/app/message", {}, JSON.stringify({ 'message': message,'user':user }));
}
function showServerMessage(message) {
    var response = document.getElementById('response');
    var labelModify = document.getElementById('message');
    devPos();
    response.innerHTML=(message);
    labelModify.value=(message);
    
   
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


