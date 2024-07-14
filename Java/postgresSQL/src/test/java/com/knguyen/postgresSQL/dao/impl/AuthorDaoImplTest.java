package com.knguyen.postgresSQL.dao.impl;


import com.knguyen.postgresSQL.TestDataUtil;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.jdbc.core.JdbcTemplate;
import com.knguyen.postgresSQL.domain.Author;


import java.util.List;

import static com.knguyen.postgresSQL.TestDataUtil.createTestAuthorA;
import static org.mockito.Mockito.verify;
import static org.mockito.ArgumentMatchers.eq;


@ExtendWith(MockitoExtension.class)
public class AuthorDaoImplTest {


    /**
     * Creates a mock instance/implementation of this 'JdbcTemplate'. So it's not the real one, meaning we aren't
     * going to be doing real database operations when we call functions in AAuthorDaoImpl.
     */
    @Mock
    private JdbcTemplate jdbcTemplate;


    /**
     * Creates an instance of a class, so this is the real class, but we 'inject' the mocks
     * created with '@Mock' into it. In this case, AuthorDaoImpl expects a bean for 'JdbcTemplate' to be
     * injected into it by Spring when the application starts. So we do this, but instead of injecting the real bean,
     * we inject the mock JdbcTemplate instead.
     *
     * Just a simple way of doing things so that we don't interact with a real database.
     */
    @InjectMocks
    private AuthorDaoImpl underTest;


    /**
     * We want to see if our function for creating an author generates the SQL
     * code that we expect. So call .create() method which should call our
     * jdbcTemplate.update() method.
     *
     *
     */
    @Test
    public void testThatCreateAuthorGeneratesCorrectSql() {
        Author author = createTestAuthorA();

        underTest.create(author);

        /*
         * Check whether a given function was called on the jdbcTemplate, and check if
         * the '.update()' method on said jdbcTemplate (our bean) had been called with certain values.
         * So yeah check that the SQL and values were correct.
         *
         * NOTE: This is a unit test and in these tests, we aren't testing against an actual in-memory
         * database. To test against a real (albeit in-memory) database, we'll create an integration test.
         */
        verify(jdbcTemplate).update(
                eq("INSERT INTO authors (id, name, age) VALUES (?, ?, ?)"),
                eq(1L), eq("Abigail Rose"), eq(80)
        );
    }




    @Test
    public void testThatFindOneGeneratesCorrectSql() {
        underTest.findOne(1L);
        verify(jdbcTemplate).query(
                eq("SELECT id, name, age FROM authors WHERE id = ? LIMIT 1"),
                ArgumentMatchers.<AuthorDaoImpl.AuthorRowMapper>any(),
                eq(1L)
        );
    }


    // Test that tests the AuthorDaoImp's find function that should return a list of authors
    @Test
    public void testThatFindManyGeneratesCorrectSql() {
        List<Author> authors = underTest.find();
        verify(jdbcTemplate).query(
                eq("SELECT id, name, age FROM authors"),
                ArgumentMatchers.<AuthorDaoImpl.AuthorRowMapper>any()
        );
    }

    // Test that our update function is generating the expected sql statement
    @Test
    public void testThatUpdateGeneratesCorrectSql() {
        Author author = TestDataUtil.createTestAuthorA();
        underTest.update(author.getId(), author);

        verify(jdbcTemplate).update(
                "UPDATE authors SET id = ?, name = ?, age = ? WHERE id = ?",
                author.getId(), author.getName(), author.getAge(), author.getId()
        );
    }

    @Test
    public void testThatDeleteGeneratesCorrectSql() {

        // Mock delete an author
        underTest.delete(1L);

        // Verify the .update() function was called on our jdbcTemplate bean
        verify(jdbcTemplate).update(
                eq("DELETE FROM authors WHERE id = ?"),
                eq(1L)
        );
    }


}
