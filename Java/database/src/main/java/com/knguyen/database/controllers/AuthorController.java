package com.knguyen.database.controllers;

import com.knguyen.database.domain.dto.AuthorDto;
import com.knguyen.database.domain.entities.AuthorEntity;
import com.knguyen.database.mappers.Mapper;
import com.knguyen.database.services.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class AuthorController {

    /**
     * Our AuthorService and AuthorEntity Mapper are both
     * expected to be beans that Spring is going to inject
     * into our application. So Spring will handle calling this constructor
     * and passing in these arguments when the application starts.
     */
    private AuthorService authorService;
    private Mapper<AuthorEntity, AuthorDto> authorMapper;

    public AuthorController(AuthorService authorService, Mapper<AuthorEntity, AuthorDto> authorMapper) {
        this.authorService = authorService;
        this.authorMapper = authorMapper;
    }

    /**
     * Tell Spring to look for the Author object that's in JSON form
     * in our request's body.
     *
     * + Issue with the 'Author' object:
     * The issue is that we're using the Author object in our presentation layer. Ideally, this Author object
     * should be in our Persistence layer, and our controllers should work without knowing the implementation
     * of the Persistence layer. Persistence talks to service, and then service talks to presentation. That's how things should work.
     *
     * + Solution:
     * We'd use a 'DTO' (Data-Transfer-Object). It'd work the same as the service layer returns our entity (Author), however,
     * we'd convert this entity into a 'DTO', and send the DTO back to the user. Hence, the name 'data-transfer object'.
     * We'd also expect the 'DTO' data to be in the request body as well.
     *
     * So summary in the controller, we're expecting a DTO version of the author object, and when sending back a response,
     * we'll send the JSON for that DTO. So a DTO is going to be an extra object that represents the Author that we'll
     * use in our presentation layer!
     *
     * + Extra considerations with separation and theory:
     *  Our 'createAuthor' still relies on an 'Author' object instead of a DTO. There are different schools of thought
     *  on whether this is okay or not. Some think it's alright since the service layer is going to deal with your
     *  underlying business logic, and some details of the persistence layer isn't really the end of the world. The main
     *  idea is that we want to separate the presentation layer from our service and persistence layers via these DTOs.
     *
     * + Mapping Entities to DTOs:
     * You can create the mapping logic, but since this is a very common problem and use-case for developers, there are many
     * libraries that handle mapping for you. One such library is 'modelmapper'
     *
     * + ResponseEntity: It seems that by default, when returning something with SpringWeb, it's probably
     * going to try to convert what you returned to JSON format, and then default to status code 200. However,
     * by using a ResponseEntity, you can customize the response code sent back as well. So just using a ResponseEntity
     * is standard when sending a response back to the user.
     *
     */
    @PostMapping(path = "/authors")
    public ResponseEntity<AuthorDto> createAuthor(@RequestBody AuthorDto author) {

        // Create an author from the author DTO that was received from the request's body
        AuthorEntity authorEntity = authorMapper.mapFrom(author);

        // Call function to save the author in the database
        AuthorEntity savedAuthorEntity = authorService.save(authorEntity);

        // Return a response with the saved author DTO as JSON (json conversion handled by jackson), with status code 201 (resource created)
        return new ResponseEntity<>(authorMapper.mapTo(savedAuthorEntity), HttpStatus.CREATED);
    }

    @GetMapping(path = "/authors")
    public List<AuthorDto> listAuthors() {
        /*
         * - You should be returned a list of AuthorEntity objects. Remember that these are the
         *    objects that are more related to the persistence layer, so we need to convert them.
         *    Convert them into AuthorDTO objects, so now our code is more separated.
         *
         * We use the streamAPI to do the conversion as it allows us to do things such as 'map'.
         * For the callback function we pass the 'mapTo' function to convert every AuthorEntity into a
         * AuthorDTO, and then return a list of the result.
         */
        List<AuthorEntity> authors = authorService.findAll();
        return authors.stream()
                .map(authorMapper::mapTo)
                .collect(Collectors.toList());
    }



    @GetMapping(path = "/authors/{id}")
    public ResponseEntity<AuthorDto> getAuthor(@PathVariable("id") Long id) {
        /*
         * So foundAuthor could be an AuthorEntity (a value), or it could be empty. So if
         * the value is present, then we can do functional style methods on it such as
         * 'map', 'flatMap', 'filter', etc. Else, when the value is empty, then the 'orElse' method is
         * called.
         *
         * In this case, when foundAuthor has a value, we convert it back into a dto, and send that data back
         * to the user. Else we send a 404 not found.
         */
        Optional<AuthorEntity> foundAuthor = authorService.findOne(id);
        return foundAuthor.map(authorEntity -> {
            AuthorDto authorDto = authorMapper.mapTo(authorEntity);
            return new ResponseEntity<>(authorDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/authors/{id}")
    public ResponseEntity<AuthorDto> fullUpdateAuthor(
            @PathVariable("id") Long id,
            @RequestBody AuthorDto authorDto) {

        if(!authorService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        authorDto.setId(id);
        AuthorEntity authorEntity = authorMapper.mapFrom(authorDto);
        AuthorEntity savedAuthorEntity = authorService.save(authorEntity);
        return new ResponseEntity<>(
                authorMapper.mapTo(savedAuthorEntity),
                HttpStatus.OK);
    }

    /**
     *
     *
     * @param id - Id of the author that's being updated
     * @param authorDto - Since we're doing a partial update, not all the fields have to be provided.
     */
    @PatchMapping(path = "/authors/{id}")
    public ResponseEntity<AuthorDto> partialUpdate(
            @PathVariable("id") Long id,
            @RequestBody AuthorDto authorDto
    ) {

        // Ensure that the author we're updating actually exists first
        if(!authorService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Create an author entity from our dto, and call our service function for doing a partial update.
        AuthorEntity authorEntity = authorMapper.mapFrom(authorDto);
        AuthorEntity updatedAuthor = authorService.partialUpdate(id, authorEntity);
        return new ResponseEntity<>(
                authorMapper.mapTo(updatedAuthor),
                HttpStatus.OK);
    }

    @DeleteMapping(path = "/authors/{id}")
    public ResponseEntity deleteAuthor(@PathVariable("id") Long id) {
        authorService.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
