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
    private String sendTo;

    public String getSendTo() {
        return sendTo;
    }

    public void setSendTo(String sendTo) {
        this.sendTo = sendTo;
    }
    public ServerMessage(String content,String senTo) {
    this.content = content;
    this.sendTo=senTo;
    }
    public String getContent() {
    return content;
    }
}
