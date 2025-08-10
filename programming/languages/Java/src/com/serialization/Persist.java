package com.serialization;
import java.io.*;


public class Persist {

    public static void main(String args[]) {
        try {
            Student s1 = new Student (211, "Ravi");

            /*
             * 'fout' is just an object that'll allow su to send binary data to this file.
             */
            FileOutputStream fout = new FileOutputStream("f.txt");

            /*
             * Object allows us to convert primitives and objects to bytes, and it will send those
             * bytes to that FileOutputStream.
             */
            ObjectOutputStream out = new ObjectOutputStream(fout);

            /*
             * Converts student instance into byte data, and stores that byte-data inside 'out'.
             */
            out.writeObject(s1);

            // Sends all stored byte-data inside ObjectOutputStream (just the studnet instance's data in this case)
            // to the FileOutputStream. As a result this will allow
            out.flush();
            out.close();

            System.out.println("Successful wrote student object data to our file!");
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
