package com.serialization;
import java.io.Serializable;

/**
 *
 * + How to do it
 * 1. For the class that needs to be serialized, make it implement the Serializable interface. As a result
 *    it'll receive extra methods and functionality.
 *    More specifically, the data can now be converted/written to a stream.
 *
 * 2. OutputStream: A part of Java's IO system. It's an abstract class that provides methods for writing/sending bytes to a destination.
 *    This could be a file, network socket, or any other mechanism that accepts byte data.
 *    So when you're 'writing to an output stream' you're sending a stream of bytes to your destination.
 *    Note how I said it's an acstract class, so there are many output stream classes such as
 *    'FileoutputStream', 'BufferedOutputStream', etc.
 *
 *
 * 3. ObjectOutputStream: Class used to write primitives and objects to an 'OutputStream. However only objects that
 *    support the 'Serializable' interface can be written to streams.
 *
 *    - ObjectOutputStream(OutputStream someOutputStream): Accepts an output stream, and as a result it'll create an
 *      'ObjectOutputStream' object that writes to the 'OutputStream' you indicated.
 *
 *    - writeObject(Object obj): Writes the data of a specified object to the ObjectOutputStream. As a result the
 *                              stream would store this byte data in an internal buffer, and wait for us to call
 *                              flush() to send that data to an output stream.
 *    - flush(): 'Flushes' the current output stream. Basically means it ensures any 'buffered' data is sent to the
 *      output destination.
 *    - close(): Closes current output stream
 *
 * # What is 'buffered' data?
 * Let's compare a regular stream to a buffered stream
 *
 * - Regular: We write data byte by byte directly to the output stream. This can be slow and inefficient because we're constantly sending
 *            this data sending operation for each piece of information.
 * - Buffered data: We create temporary in-memory storage area to store all of our bytes. Then once we have everything, or when our buffer (storage area)
 *                  is full or flush() is called, then we write all of the data from the buffer (write the buffer) to the output stream all in one go.
 *                  Here we don't do multiple output operations of sending data to our destination, rather we just do it one time. It's like instead of
 *                  carrying your groceries in one by one, you carry all of them in with one trip.
 * - Benefits: Writing data to a disk (such as writing to a file), or sending it over a network can be pretty slow, and we're doing multiple
 *             operations of this with a regular data. By using buffering, we reduce the amount of time we need to do that. Also we should note that with regular
 *             streams, when you write to one, it immediately sends that data. Whilst with a buffered stream, it temporarily stores that data and we
 *             actually have control over when to do flush() and send all of our data over.
 *
 * 4. InputStream: An abstract class that represents an stream of input byte data. It's used to read data from a source
 *                 such as a file, network conenction, or other devices as bytes. Since it's abstract, you
 *                 would actually use its subclasses suc has 'FileInputStream' which is used to read file byte data, or
 *                 BufferedInputStream. Know that BufferedInputStream is a wrapper that you'd wrap around something like
 *                 'FileInputStream'. When reading data, it does it in chunks and stores it in an in-memory buffer. It reduces the need
 *                 to perform disk/IO operations, which is good. Finally you'd call it with .read() method
 *
 * 5. ObjectInputStream: De-serializes objects and primitive data that was written using an ObjectOutputStream.
 *    - ObjectInputStream(InputStream in): Creates an 'ObjectInputStream' that reads byte-data from a specified InputStream;
 *    - Object readObject(InputStream in): Reads an object from the input stream.
 *    - close(): Closes an ObjectInputStream
 *
 */

public class Student implements Serializable {
    int id;
    String name;
    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
