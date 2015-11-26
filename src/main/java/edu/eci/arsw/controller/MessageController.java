/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controller;

import edu.eci.arsw.model.ClientMessage;
import edu.eci.arsw.model.ServerMessage;
import edu.eci.arsw.model.UserMessage;
import java.util.ArrayList;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 *
 * @author 2095499
 */

@Controller
public class MessageController {
    private ClientMessage message= new ClientMessage("",new UserMessage(""));
    private ArrayList<UserMessage> users=new ArrayList<UserMessage>();
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public ServerMessage serverMessage(ClientMessage message) throws Exception {
        //Thread.sleep(3000); // simulated delay
        this.message=message;
        
        ServerMessage temp= new ServerMessage(message.getMessage(), message.getUserMessage());
        //System.out.println(message.getMessage() + " " + "metodo messagge controller   "+ message.getMessage());
        return temp;
    }
    @MessageMapping("/messageActual")
    @SendTo("/topic/messages")
    public ServerMessage serverMessageActual(UserMessage user) throws Exception {
        //Thread.sleep(3000); // simulated delay
        users.add(user);
       // System.out.println(message.getMessage()+"  "+user + " " + "metodo messagge controller emtrp   ");
       ServerMessage temp= new ServerMessage(message.getMessage(), message.getUserMessage());
       // System.out.println(message.getMessage() + " " + "metodo messagge  agregar user controller   "+ message.getMessage());
        return temp;
    }
    
    
    @MessageMapping("/users")
    @SendTo("/topic/users")
    public ArrayList<UserMessage> getUsers() throws Exception {
       
        return users;
    }
    
    @MessageMapping("/usersDelete")
    @SendTo("/topic/users")
    public ArrayList<UserMessage> DeleteUser(UserMessage user) throws Exception {
        System.out.println(user.getName()+"              "+users.size());
        int ind=0;
        for (int i=0;i<users.size();i++){
            if (user.getName().equals(users.get(i).getName())){
                ind=i;
            }
        }
        //int ind=users.indexOf(user);
        users.remove(ind);
        System.out.println("despues de borrado    "+ users.size());
        return users;
    }
    
    
    
    
    
   }

