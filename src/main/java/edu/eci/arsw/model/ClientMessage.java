/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.model;

/**
 *
 * @author 2095499
 */
public class ClientMessage {
    private String message;
    private UserMessage userMessage;
    public ClientMessage(String message,UserMessage userMessage){
        this.message=message;
        this.userMessage=userMessage;
    }
    public ClientMessage(){
        
    }
    public UserMessage getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(UserMessage userMessage) {
        this.userMessage = userMessage;
    }


    
    public String getMessage() {
    return message;
    }
    public void setMessage(String message) {
    this.message = message;
    }
   
}
