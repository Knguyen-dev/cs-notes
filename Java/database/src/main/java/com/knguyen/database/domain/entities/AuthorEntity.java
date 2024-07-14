package com.knguyen.database.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data // Creates our getters, setters, equals, and hashCode methods
@AllArgsConstructor // These creates the constructors
@NoArgsConstructor
@Builder // Allows us to use the builder pattern when we instantiate the AuthorEntity in code.
@Entity // Converts our class into a spring data entity, so that gives us some functionality?
@Table(name = "authors") // associated with the 'authors' table; So I guess this should create the authors table
public class AuthorEntity {

    /**
     * @Entity: This marks the class as a JPA entity. It tells JPA that this class should be mapped/linked to a database table.
     *          As well as this, when you perform CURD operations, and do .save(), on it, it translates these into SQL queries
     *          that are executed against your database. So here it marks AuthorEntity as a JPA entity, so Hibernate will
     *          map this class to a table in the database.
     *
     * @Table: Used to specify the details of the table that our class is being mapped to. You can specify the name of the table,
     *         the schema of the table, and then constraints and indexes. So here we specify the clas swill be mapped to a database
     *         table called 'authors'. Without this annotation the table name that we'd map to would be 'AuthorEntity'.
     *
     *
     */
    // One way of setting 'id' as the primary key and also having it auto-increment.
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "author_id_seq")
    private Long id;


    private String name;
    private Integer age;
}
