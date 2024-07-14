package com.knguyendev.JacksonJson.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * JsonIgnoreProperties:
 *
 */


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class Book {
    private String isbn;
    private String title;
    private String author;


    /**
     * Anytime you convert a java object into json, the 'yearPublished' field will be converted into 'year'. As well as
     * this, any time you have a json object with the field 'year', it will be converted into 'yearPublished'
     *
     *
     */
    @JsonProperty("year")
    private int yearPublished;
}
