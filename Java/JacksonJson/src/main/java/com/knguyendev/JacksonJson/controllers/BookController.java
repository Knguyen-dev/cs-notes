package com.knguyendev.JacksonJson.controllers;
import com.knguyendev.JacksonJson.domain.Book;

import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@Log
public class BookController {

    @GetMapping(path="/books")
    public Book retrieveBook() {

        /*
         * Spring web will automatically convert our the book instance in JSON when
         * we send it back in our response!
         *
         * So this is the idea of converting a Java Object into JSON.
         */
        return Book.builder()
                .isbn("123-456-789-0")
                .title("The Enigma of Eternity")
                .author("Aria Montgomery")
                .yearPublished(2005)
                .build();
    }

    /*
     * So in the request body we expect fields for a book. So we're expecting a book
     * in JSON format in the body of our POST request. However, Spring will convert
     * this JSON into a Java Object. This allows us to work with it as a class instance!
     *
     * req.body = {
     *   "isbn": <some-value>,
     *   "title": <some-value>
     *   "author": <some-value>.
     *   "yearPublished": <some-value>,
     * }
     *
     *
     */
    @PostMapping(path="/books")
    public Book createBook(@RequestBody final Book book) {
        log.info("Got book: " + book.toString());
        return book;
    }
}
