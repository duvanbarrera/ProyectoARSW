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
    private String user;

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
    public String getMessage() {
    return message;
    }
    public void setMessage(String message) {
    this.message = message;
    }
   
}
