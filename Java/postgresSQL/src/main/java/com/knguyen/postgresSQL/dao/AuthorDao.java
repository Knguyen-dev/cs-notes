package com.knguyen.postgresSQL.dao;

import com.knguyen.postgresSQL.domain.Author;

import java.util.List;
import java.util.Optional;

public interface AuthorDao {

    void create(Author author);

    // If we found an author, it'll come back wrapped in an optional. Else
    // We'll get an optional with empty.
    Optional<Author> findOne(long authorId);


    // Seems the workflow is, create the test for a method, create the method on the interface
    // and then finally create method's implementation on the implementation classes.
    List<Author> find();


    // Update an author with a given authorId with new data contained in an author object; a full update
    void update(long authorId, Author author);


    // Delete an author based on their id
    void delete(long authorId);
}
