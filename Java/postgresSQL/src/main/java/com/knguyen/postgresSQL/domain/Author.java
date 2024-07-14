package com.knguyen.postgresSQL.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data // Creates our getters, setters, equals, and hashCode methods
@AllArgsConstructor
@NoArgsConstructor
@Builder // just so that we can use the builder pattern
public class Author {

    /**
     * Wrappers like 'Long' and 'Integer' can be null, which is useful when working in
     * databases where certain fields can be nullable.
     */
    private Long id;
    private String name;
    private Integer age;
}
