/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package queuemain;

/**
 *
 * @author Marco Gonzalez
 */
public class QueueMain {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       Queue q = new Queue(10);
       q.insert('a');
       q.insert('b');
    }

}
