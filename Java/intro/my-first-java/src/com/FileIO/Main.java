/**
 * Java has two file APIs:
 *
 * - java.io.File: The original file API that's used in a lot of older projects, frameworks,
 *    libraries, and legacy code. Not yet deprecated, and probably never will, so it's good to
 *    be familiar, or at least be exposed to some examples and notes.
 * - java.nio.file.Path: A more modern API that does everything the old one does, but generally
 *   in a better way and has more features.
 *   1. File features: Supports metadata and file attributes, and more
 *   2. Better usage in programs. E.g. when deleting a file, you'll get an exception when
 *      the deletion operation is not successful (no such file, file locked, etc.) instead of just
 *      'false' ot indicate a failure.
 *
 *
 * 1. https://www.marcobehler.com/guides/java-files
 * 2. https://www.javatpoint.com/java-file-class
 */

package com.FileIO;





import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileTime;
import java.nio.file.attribute.UserPrincipal;
import java.nio.file.StandardOpenOption;
import java.util.List;


public class Main {


    public static void main(String[] args) {
        try {
            pathApi();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    // Intro to the path api
    public static void pathApi() throws IOException {
        // Path to a file that potentially exists; For Java < 11, use 'Paths.get()'
        Path filePath = Path.of("sample.txt");

        boolean exists = Files.exists(filePath);

        // Returns the time in ISO format or 'FileTime' object
        FileTime lastModifiedTime = Files.getLastModifiedTime(filePath);

        // For example, "DESKTOP-168M0IF\marco_local (User)"
        UserPrincipal owner = Files.getOwner(filePath);

        System.out.println("Exists: " + exists);
        System.out.println("Last Modified Time: " + lastModifiedTime);
        System.out.println("Owner: " + owner);
    }

    public static void createFile(String fileName) throws IOException {
        Path filePath = Path.of(fileName);
        if (!Files.exists(filePath)) {
            Files.createFile(filePath);
            System.out.println("File created: " + filePath);
        } else {
            System.out.println("File already exists: " + filePath);
        }
    }

    /**
     *
     * We'll read all of the lines and we're returned a list of strings
     *
     * NOTE: List is just a more feature-rich version of Java's native array.
     * It's dynamic and good in cases where we don't know the size in advance, or it may change.
     *
     * You could also use Files.readString(filePath);, to read the file's contents as a single string.
     */
    public static List<String> readFile(String fileName) throws IOException {
        Path filePath = Path.of(fileName);
        return Files.readAllLines(filePath);
    }

    /**
     * To write to a file we'll send in a list of strings, with each element acting as
     * a line in teh file
     * NOTE: the 'CREATE' option will automatically create it if it doesn't exist.We're doing
     * append, which just means we're adding stuff to the end of the file if it already exists.
     * Although you could quickly hover over these to know that.
     */
    public static void writeFile(String fileName, List<String> lines) throws IOException {
        Path filePath = Path.of(fileName);
        Files.write(filePath, lines, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        System.out.println("File written: " + filePath);
    }

    public static void deleteFile(String fileName) throws IOException {
          Path filePath = Path.of(fileName);
        if (Files.exists(filePath)) {
            Files.delete(filePath);
            System.out.println("File deleted: " + filePath);
        } else {
            System.out.println("File does not exist: " + filePath);
        }
    }

    public static void createDirectory(String dirName) throws IOException {
        Path dirPath = Path.of(dirName);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
            System.out.println("Directory created: " + dirPath);
        } else {
            System.out.println("Directory already exists: " + dirPath);
        }
    }



    public static void BroCodeFile() {
        // It will begin at the root of our project directory; so this is a relative path
        File file = new File("some.txt");
        if (file.exists()) { // we found a file or folder
            System.out.println("That file exists");

            System.out.println("Relative path: " + file.getPath()); // matches what we put into the file constructor
            System.out.println("Absolute path: " + file.getAbsolutePath());
            System.out.println("Is a file: " + file.isFile()); // we actually found a file

            // Deletes our selected file or folder
            file.delete();
        }
    }

    public static void BroWrite() {
        try {
            // BufferedWriter writes to a lot of things, so we pass it FileWriter so that it knows to write to a file
            BufferedWriter writer = new BufferedWriter(new FileWriter("poem.txt"));
            writer.write("Amazing Poem");
            writer.write("\n A poem by Dude");

            // writer.append to add to the end of a file; but note everytime we open the file we are overwriting it
            writer.close();
        } catch (IOException e) {
            System.out.println("Error with file: " + e.getMessage());
        }
    }

    public static void BroRead() {
        try {
            FileReader fileReader = new FileReader("some-file-name.txt");

            // Reads it one character at a time, but only the byte values; file ends when 'data' is -1
            int data = fileReader.read();
            while (data != -1) {
                // Print out byte data as a character
                System.out.println((char)data);
                // Update byte data to get next byte?
                data = fileReader.read();
            }


        } catch (IOException e) {
            System.out.println("File error: " + e);
        }
    }


    // https://www.youtube.com/watch?v=ScUJx4aWRi0
    // better reader
    private static void betterReader() {

        try {
            BufferedReader reader = new BufferedReader(new FileReader("some-file.txt"));
            String line;
            // in each iteration update line, if line is null (file is over), then we end the loop
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (FileNotFoundException e) {
            System.out.println("File wasn't found dude");
        } catch (IOException e) {
            System.out.println("File IO Exception: " + e);
        }

    }
}
