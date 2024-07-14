package com.knguyen.postgresSQL;

import com.knguyen.postgresSQL.domain.Author;
import com.knguyen.postgresSQL.domain.Book;

/**
 * Has our utility classes for our tests
 */

public final class TestDataUtil {

    private TestDataUtil() {}


    public static Book createTestBookA() {
        return Book
                .builder()
                .isbn("987-1-2345-6789-0")
                .title("The Shadow in the Attic")
                .authorId(1L)
                .build();
    }

    public static Book createTestBookB() {
        return Book
                .builder()
                .isbn("987-1-2345-6789-1")
                .title("The Jungle")
                .authorId(2L)
                .build();
    }

    public static Book createTestBookC() {
        return Book
                .builder()
                .isbn("987-1-2345-6789-3")
                .title("The Lion")
                .authorId(3L)
                .build();
    }




    public static Author createTestAuthorA() {
        return Author
                .builder()
                .id(1L)
                .name("Abigail Rose")
                .age(80)
                .build();
    }

    public static Author createTestAuthorB() {
        return Author
                .builder()
                .id(2L)
                .name("James May")
                .age(32)
                .build();
    }

    public static Author createTestAuthorC() {
        return Author
                .builder()
                .id(3L)
                .name("Thomas Cronin")
                .age(54)
                .build();
    }

    public static Author createTestAuthorD() {
        return Author
                .builder()
                .id(4L)
                .name("Jesse A Casey")
                .age(24)
                .build();
    }



}
