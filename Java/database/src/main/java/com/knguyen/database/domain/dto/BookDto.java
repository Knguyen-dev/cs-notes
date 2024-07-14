package com.knguyen.database.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * + BookDto:
 * A data-transfer object. We'll convert a BookEntity into a BookDto, and
 * send the JSON version of the book dto back to the user.
 *
 *
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookDto {

    private String isbn;

    private String title;

    private AuthorDto author;

}
