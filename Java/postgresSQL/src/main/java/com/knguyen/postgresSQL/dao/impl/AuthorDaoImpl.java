package com.knguyen.postgresSQL.dao.impl;

import com.knguyen.postgresSQL.dao.AuthorDao;
import com.knguyen.postgresSQL.domain.Author;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;


// Make this a bean; needed to do the integration test
@Component
public class AuthorDaoImpl implements AuthorDao {
    private final JdbcTemplate jdbcTemplate;
    // We're relying on Spring Context to inject our JdbcTemplate bean or implementation from Spring's 'context' when our application starts
    public AuthorDaoImpl(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public void create(Author author) {

        /**
         * .update() and .query() are used for executing SQL statements at a higher level, giving us more functionality
         *
         * 1. .update(): Used for INSERT, UPDATE, and DELETE statements. First paraemter is the SQL query string whilst the
         *               rest are your parameters that take the place of the '?'
         * 2. .query(): For executing SELECT statements. It allows us to use a row mapper and map the values of a row to
         *              a custom object.
         *
         * + Why not use .execute()?
         * The execute() method is a lower-level method used to execute any SQL statement. It doesn't provide the convenience
         * or additional features that .update() and .query() offer. So no parameter handling or row mapping, which isn't ideal.
         * It's a helper function really.
         */
        jdbcTemplate.update(
                "INSERT INTO authors (id, name, age) VALUES (?, ?, ?)",
                author.getId(), author.getName(), author.getAge()
        );
    }

    @Override
    public Optional<Author> findOne(long authorId) {

        // Get back a list, but only one author, use our AuthorRowMapper since that's allowed
        List<Author> results = jdbcTemplate.query(
                "SELECT id, name, age FROM authors WHERE id = ? LIMIT 1",
                    new AuthorRowMapper(), authorId);


        // We'll use the stream API to return that first author; remember it may or may not exist
        return results.stream().findFirst();
    }

    @Override
    public List<Author> find() {

        // use .query to find soemthing
        return jdbcTemplate.query(
                "SELECT id, name, age FROM authors",
                new AuthorRowMapper()
        );
    }

    // Function for doing a full update
    @Override
    public void update(long authorId, Author author) {

        // use .update to update something
        jdbcTemplate.update(
                "UPDATE authors SET id = ?, name = ?, age = ? WHERE id = ?",
                authorId, author.getName(), author.getAge(), author.getId()
        );
    }

    @Override
    public void delete(long authorId) {
        jdbcTemplate.update("DELETE FROM authors WHERE id = ?", authorId);
    }


    /*
     * + Row Mapper: Exists to convert a result set, which is an object returned by our database queries into a more familiar object.
     * In this case, we need it to convert that result set into an Author object. RowMapper is just one of the ways we can do this
     *
     * So here we're doing the complex logic of getting the column values form our SQL result set, and then using those values
     * to create an Author instance that we can send back.
     */
    public static class AuthorRowMapper implements RowMapper<Author> {
        @Override
        public Author mapRow(ResultSet rs, int rowNum) throws SQLException {
            return Author.builder()
                    .id(rs.getLong("id"))
                    .name(rs.getString("name"))
                    .age(rs.getInt("age"))
                    .build();
        }
    }

}
