package com.knguyen.postgresSQL.dao.impl;


import com.knguyen.postgresSQL.TestDataUtil;
import com.knguyen.postgresSQL.domain.Author;

import com.knguyen.postgresSQL.dao.AuthorDao;
import com.knguyen.postgresSQL.domain.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

/**
 * Do '@DirtiesContext' so the test database's state is cleared everytime since we are doing
 * real database work with an in-memory database
 */
@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class BookDaoImplIntegrationTest {

    // Apparently we use the interface only, we'll let the program decide which implementation we get.
    // This should be safe as the interface is our standard that all implementations should abide by.
    private final AuthorDao authorDao;
    private final BookDaoImpl underTest;

    // Autowired as we want Spring to inject the real beans into this; so this will do real database ineractions since we aren't mocking these
    @Autowired
    public BookDaoImplIntegrationTest(BookDaoImpl underTest, AuthorDao authorDao) {
        this.underTest = underTest;
        this.authorDao = authorDao;
    }

    @Test
    public void testThatBookCanBeCreatedAndRecalled() {
        // Create author in database
        Author author = TestDataUtil.createTestAuthorA();
        authorDao.create(author);

        // Create a book and set its authorId to the book's one, we want to avoid any referential integrity violations.
        Book book = TestDataUtil.createTestBookA();
        book.setAuthorId(author.getId());

        underTest.create(book);

        // Attempt to find a book with the isbn of the book we just inserted into the database; (this should work)
        Optional<Book> result = underTest.findOne(book.getIsbn());

        // Ensure we actually got a book back instead of just 'empty' and ensure the books are equal based on the
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(book);
    }

    @Test
    public void testThatMultipleBooksCanBeCreatedAndRecalled() {

        // Create and insert author into the database
        Author authorA = TestDataUtil.createTestAuthorA();
        authorDao.create(authorA);

        // Create books and book they reference the id of the author that was recently inserted.
        Book bookA = TestDataUtil.createTestBookA();
        Book bookB = TestDataUtil.createTestBookB();
        Book bookC = TestDataUtil.createTestBookC();
        bookA.setAuthorId(authorA.getId());
        bookB.setAuthorId(authorA.getId());
        bookC.setAuthorId(authorA.getId());

        // Insert those books into the database
        underTest.create(bookA);
        underTest.create(bookB);
        underTest.create(bookC);
        List<Book> result = underTest.find();

        // Expect the list to only have 3 books
        assertThat(result).hasSize(3).containsExactly(bookA,bookB,bookC);
    }


    @Test
    public void testThatBookCanBeUpdated() {

        // Create and insert author into our in-memory database
        Author author = TestDataUtil.createTestAuthorA();
        authorDao.create(author);

        // Create book for the author and insert it into the database
        Book bookA = TestDataUtil.createTestBookA();
        bookA.setAuthorId(author.getId());
        underTest.create(bookA);

        // Update title of the book and update the book in the database
        bookA.setTitle("Updated Title");
        underTest.update(bookA.getIsbn(), bookA);

        // Attempt to find that updated book in the database and verify that the update operation was correct
        Optional<Book> result = underTest.findOne(bookA.getIsbn());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(bookA);
    }


    @Test
    public void testThatBookCanBeDeleted() {
        // Create and insert author into our in-memory database
        Author author = TestDataUtil.createTestAuthorA();
        authorDao.create(author);

        // Create book for the author and insert it into the database
        Book bookA = TestDataUtil.createTestBookA();
        bookA.setAuthorId(author.getId());
        underTest.create(bookA);

        // Delete said book
        underTest.delete(bookA.getIsbn());

        // Attempt to find the book that was deleted; we expect our result to be empty
        Optional<Book> result = underTest.findOne(bookA.getIsbn());
        assertThat(result).isEmpty();

    }



}
