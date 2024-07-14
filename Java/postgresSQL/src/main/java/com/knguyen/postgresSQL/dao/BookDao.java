package com.knguyen.postgresSQL.dao;


import com.knguyen.postgresSQL.domain.Book;

import java.util.List;
import java.util.Optional;

public interface BookDao {

    public void create(Book book);

    Optional<Book> findOne(String isbn);


    List<Book> find();


    void update(String isbn, Book book);

    void delete(String isbn);

}
