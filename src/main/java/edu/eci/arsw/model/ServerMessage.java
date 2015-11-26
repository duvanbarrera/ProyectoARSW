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
public class ServerMessage {
    private String content;
    private UserMessage userMessage;

    public UserMessage getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(UserMessage userMessage) {
        this.userMessage = userMessage;
    }




    public ServerMessage(String content,UserMessage userMessage) {
    this.content = content;
    this.userMessage=userMessage;
    }
    public String getContent() {
    return content;
    }
}
