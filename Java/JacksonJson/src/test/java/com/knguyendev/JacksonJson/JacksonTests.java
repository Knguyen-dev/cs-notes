package com.knguyendev.JacksonJson;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.knguyendev.JacksonJson.domain.Book;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.assertj.core.api.Assertions.assertThat;



@SpringBootTest
public class JacksonTests {


    /**
     * Converting Java to JSON with an object mapper
     *
     */
    @Test
    public void testThatObjectMapperCanCreateJsonFromJavaObject() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Book book = Book.builder()
                .isbn("987-654-321-0")
                .title("The Enigma of Eternity")
                .author("Aria Montgomery")
                .yearPublished(2005)
                .build();

        String result = objectMapper.writeValueAsString(book);

        assertThat(result).isEqualTo("{\"isbn\":\"987-654-321-0\",\"title\":\"The Enigma of Eternity\",\"author\":\"Aria Montgomery\",\"year\":2005}");
    }


    @Test
    public void testThatObjectMapperCanCreateJavaObjectFromJsonObject() throws JsonProcessingException {
        Book book = Book.builder()
                .isbn("987-654-321-0")
                .title("The Enigma of Eternity")
                .author("Aria Montgomery")
                .yearPublished(2005)
                .build();


        /*
         * + Ignoring properties:
         * When there's an unknown property such as 'foo': 'bar' in our json, Java will throw an error when it's trying
         * to convert that JSON into a Java object. However, there could be situations where we may want to allow these
         * extra properties to exist.
         *
         *
         */

        String json = "{\"isbn\":\"987-654-321-0\",\"title\":\"The Enigma of Eternity\",\"author\":\"Aria Montgomery\",\"year\":2005}";
        final ObjectMapper objectMapper = new ObjectMapper();

        // Reading json as our Book java object
        Book result = objectMapper.readValue(json, Book.class);

        assertThat(result).isEqualTo(book);
    }



}
