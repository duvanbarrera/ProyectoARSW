/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controller;

import edu.eci.arsw.model.ClientMessage;
import edu.eci.arsw.model.ServerMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 *
 * @author 2095499
 */

@Controller
public class MessageController {
    private ClientMessage message=new ClientMessage();
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public ServerMessage serverMessage(ClientMessage message) throws Exception {
        //Thread.sleep(3000); // simulated delay
        this.message=message;
        System.out.println(message.getMessage() + " " + "metodo messagge controller");
        return new ServerMessage(message.getMessage(),message.getUser());
    }
    @MessageMapping("/messageActual")
    @SendTo("/topic/messages")
    public ServerMessage serverMessageActual(String user) throws Exception {
        //Thread.sleep(3000); // simulated delay
        
        System.out.println(message.getMessage()+"  "+user + " " + "metodo messagge controller emtrp   ");
        return new ServerMessage(message.getMessage(),message.getUser());
    }
    
    
   }

