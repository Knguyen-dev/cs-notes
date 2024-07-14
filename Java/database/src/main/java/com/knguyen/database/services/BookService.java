package com.knguyen.database.services;

import com.knguyen.database.domain.entities.BookEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BookService {

    BookEntity createUpdateBook(String isbn, BookEntity book);

    List<BookEntity> findAll();
    Optional<BookEntity> findOne(String isbn);

    boolean isExists(String isbn);

    BookEntity partialUpdate(String isbn, BookEntity bookEntity);

    void delete(String isbn);


    /**
     *
     * @param pageable - Contains informations such as how we sort it, the offset/how much we skip, etc.
     */
    Page<BookEntity> findAll(Pageable pageable);

}
