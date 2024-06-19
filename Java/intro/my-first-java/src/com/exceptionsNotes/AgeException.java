package com.exceptionsNotes;

/**
 * When we throw this exception, we'll pass a message such as "You're too young" or
 * "This user is under 18 and isn't eligible!";
 */
public class AgeException extends Exception {
    AgeException(String message) {
        super(message);
    }
}
