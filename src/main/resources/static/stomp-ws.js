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
}
function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/messages', function(serverMessage){
    
    showServerMessage(JSON.parse(serverMessage.body).content);
    });
    });
}
    
    
function disconnect() {
    if (stompClient != null) {
    stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}
function sendMessage() {
    var message = document.getElementById('message').value;
    var user = document.getElementById('user').value;
    stompClient.send("/app/message", {}, JSON.stringify({ 'message': message,'user':user }));
}
function showServerMessage(message) {
    var response = document.getElementById('response');
    var labelModify = document.getElementById('message');
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