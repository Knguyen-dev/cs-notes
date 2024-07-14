package com.knguyen.postgresSQL.dao.impl;


import com.knguyen.postgresSQL.TestDataUtil;
import com.knguyen.postgresSQL.domain.Author;

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
 * + Test Pollution
 * - Situation: In our first test we created AuthorA, with a primary key 1. Then, when our second test is running,
 * we get a duplicate key error saying. This is because we're inserting AuthorA again. This is called test pollution as the
 * results from a previous test are influencing the results of the tests coming after it. So what we want is a clean/cleared
 * database for every test that runs.
 *
 * - SOLUTION: Use '@DirtiesContext' annotation, which will clear the context based on your conditions.
 * So the Spring 'context' is cleared, and what's in this spring context? Well, the JdbcTemplate bean is cleared
 * for every test, so the database state is cleared.
 *
 */
@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AuthorDaoImplIntegrationTest {
    // The implementation of our AuthorDao is being tested here
    private final AuthorDaoImpl underTest;

    /**
     * So we need to inject the real thing, so we put 'Autowired' to tell Spring that it should inject dependencies
     * based on this.
     *
     */
    @Autowired
    public AuthorDaoImplIntegrationTest(AuthorDaoImpl underTest) {
        this.underTest = underTest;
    }

    // Test that it's actually inserting an author in the database
    @Test
    public void testThatAuthorCanBeCreatedAndRecalled() {
        Author author = TestDataUtil.createTestAuthorA();

        // Create author in a database, and attempt to find said author
        underTest.create(author);
        Optional<Author> result = underTest.findOne(author.getId());

        // We expect that result does exist, and it isn't 'empty'
        assertThat(result).isPresent();
        // Assert that they're equal?
        /*
         * This isEqualTo method uses the equals() method of the class to compare them.
         * Since we are using lombok, it should compare the references, however, if references are
         * different then it compares every field on the classes to see if they are equal.
         *
         */
        assertThat(result.get()).isEqualTo(author);
    }


    @Test
    public void testThatMultipleAuthorsCanBeCreatedAndRecalled() {

        Author authorA = TestDataUtil.createTestAuthorA();
        Author authorB = TestDataUtil.createTestAuthorB();
        Author authorC = TestDataUtil.createTestAuthorC();
        Author authorD = TestDataUtil.createTestAuthorD();
        underTest.create(authorA);
        underTest.create(authorB);
        underTest.create(authorC);
        underTest.create(authorD);
        List<Author> result = underTest.find();

        // Expect the list to have four values, and the list contains those objects
        assertThat(result).hasSize(4).containsExactly(authorA,authorB,authorC,authorD);
    }


    @Test
    public void testThatAuthorCanBeUpdated() {

        // Insert author into the database
        Author authorA = TestDataUtil.createTestAuthorA();
        underTest.create(authorA);

        // Update Author instance; only updates instance not database version
        authorA.setName("James Madison");

        // Update author instance in the database
        underTest.update(authorA.getId(), authorA);

        // Fetch that same author from the database, and see if the changes took place correctly
        Optional<Author> result = underTest.findOne(authorA.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(authorA);
    }


    @Test
    public void testThatAuthorCanBeDeleted() {
        // Create an author; insert it and then delete it from the database
        Author authorA = TestDataUtil.createTestAuthorA();
        underTest.create(authorA);
        underTest.delete(authorA.getId());

        // Attempt to find author from the database; we expect the result to be empty as it should have been deleted,
        Optional<Author> result = underTest.findOne(authorA.getId());
        assertThat(result).isEmpty();
    }
}
