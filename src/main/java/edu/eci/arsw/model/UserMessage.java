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
public class UserMessage {
    private String name;
    public UserMessage(String name){
        this.name=name;
    }
    public UserMessage(){
        
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}
