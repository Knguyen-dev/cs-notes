package com.serialization;


/**
 * + What is 'serialization' in Java?
 *
 * It's 'writing the state of an object into a byte stream'. So just converting
 * an object's data into bytes? Used in technologies such as Hibernate, RMI, JPA, etc. if you know those.
 *
 * + Deserialization
 * Where we take a byte-stream and convert it back into an object. You should note that
 * the process of serial. and deserial. are platofmr independent, meaning you can serial.
 * an object on one platform, and deserial. on another. It's just bytes in the end.
 *
 * + Why do we do this?:
 * Well we need to send data over the Internet, over a network. I guess serialization just
 * allows us to ocnform to certain standards and do that quite easily.
 *
 *
 * + Comparing it to JavaScript's Serialization:
 *
 * - JavaScript:
 * It's similar to how we send over data in JavaScript with JSON. We format our data in JSON format,
 * and a library (Express or Axios) handles serializing it (converting it into a string) that data  before sending it off,
 * and then de-serial. it back to JSON when we receive the data. This is so that it can be easily transmitted
 * over a network.
 *
 *
 * + Credits:
 * 1. https://www.javatpoint.com/serialization-in-java
 *
 */


public class Main {


}
