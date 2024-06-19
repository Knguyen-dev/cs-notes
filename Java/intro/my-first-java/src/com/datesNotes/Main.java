package com.datesNotes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter; // Import the DateTimeFormatter class

/**
 * - LocalDate: A date in 'yyyy-mm-dd'
 * - LocalTime: Time in hh-mm-ss-ns.
 * - LocalDateTime: A date and time 'yyyy-mm-dd-hh-mm-ss-ns'
 * - DateTimeFormatter: Formatter for displaying and parsing date-time objects.
 *
 * + Credits: https://www.w3schools.com/java/java_date.asp
 */
public class Main {
    public static void main(String[] args) {

        LocalDate dateObj = LocalDate.now();
        LocalTime timeObj = LocalTime.now();
        LocalDateTime dateTimeObj = LocalDateTime.now();

        // Formatter for a DateTime object
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formattedDate = dateTimeObj.format(myFormatObj);

        DateTimeFormatter monthDayYearFormatObj = DateTimeFormatter.ofPattern("MMMM d, yyyy");

        // For example: June 18, 2020
        String monthDayYearFormattedDate = dateTimeObj.format(monthDayYearFormatObj);

        System.out.println("Display current date: " + dateObj); // Today's date in form 'yyyy-mm-dd'
        System.out.println("Display current time: " + timeObj);
        System.out.println("Display current date time: " + dateTimeObj);
        System.out.println("Cool formatted date: " + formattedDate);
        System.out.println("Another formatted date: " + monthDayYearFormattedDate);
    }
}
