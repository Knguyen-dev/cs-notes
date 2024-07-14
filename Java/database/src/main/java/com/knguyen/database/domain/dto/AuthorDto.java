package com.knguyen.database.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 *
 * + Note About Jackson JSON Library:
 * Typically Jackson creates an object using the no arguments constructor, and then use setters
 * and getters to update the object. So just make sure that objects that you're using
 * with Jackson have a no arguments constructor
 *
 * + Dto
 * Our Dto for our author is a plain java object, and it should just have the same fields as our
 * domain. So nothing like @Id or @Entity, etc. since those are for Spring Data JPA only.
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthorDto {

    private Long id;

    private String name;

    private Integer age;
}
