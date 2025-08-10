package com.serialization;
import java.io.*;


public class Depersist {

    public static void main(String[] args) {
        try {
            /*
             * Create an ObjectInputStream that reads from a FileInputStream. As a result, we'd be able
             * to de-serializes the binary data coming from the stream.
             */
            ObjectInputStream in = new ObjectInputStream(new FileInputStream("f.txt"));

            // De-serialize that binary data nad convert it to a new student object.
            Student s = (Student)in.readObject();

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
