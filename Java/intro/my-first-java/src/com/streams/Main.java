package com.streams;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.IntStream;


/**
 * Bring functional programming to Java. Gives us a set of functions we can perform on certain data structures.
 * Streams aren't data-structures and they also don't modify the data-structure they're working on.
 * Hey remember .map, filter, reduce, sort in other languages that you get to apply onto array?
 *
 * Well a stream is just a collection of items that you can iterate over, and just using them makes array manipulation
 * a lot easier and more similar to other languages.
 *
 *
 * For example: We have a list of people, and we can only want females. We can iterate through the list
 * and do this, but streams can make this process more streamlined.
 *
 * + Types of stream operations:
 * 1. Intermediate operations: These would be functions such as filter, map, etc. return a stream so that
 *                             the next operation receives the stream. These operations are lazy in nature and aren't
 *                             executed immediately, meaning they setup a pipeline and a flow for how data is processed.
 *                             Without a 'terminal' operation, our stream operations won't start, and so we just have a
 *                             pipeline of data.
 *
 * 2. Terminal Operations: Receive a stream, and can return void or a non-stream result. Essentially these can reduce your
 *                         stream into a single summary element, such as count(), max(), min(), etc.
 *
 *
 *
 * + Credits:
 * 1. Java Stream tutorial: https://www.youtube.com/watch?v=FWoYpM-E3EQ
 * 2. More indepth stream tutorial: https://www.youtube.com/watch?v=VNovNwHr9jY
 *
 */

public class Main {

    public static void main() {



    }

    public static void noStream() {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Warren Buffet", 120));
        people.add(new Person("John Smalls", 50));
        people.add(new Person("Baron Bartos", 10));
        people.add(new Person("James Frank", 20));
        List<Person> hundredClub = new ArrayList<>();
         for (Person p : people) { // Iteration way:
             if (p.billions >= 100) {
                 hundredClub.add(p);
             }
         }
    }

    public static void withStream() {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Warren Buffet", 120));
        people.add(new Person("John Smalls", 101));
        people.add(new Person("Baron Bartos", 10));
        people.add(new Person("James Frank", 20));
        List<Person> hundredClub = people.stream()
                // Filter for the Person objects you want
                .filter(p -> p.billions >= 100)

                // Then return the result as a list
                .toList();

        // Sorting alphabetically based on names
        List<Person> sortedList = people
                .stream()
                .sorted(Comparator.comparing(person -> person.name))
                .toList();



    }
}