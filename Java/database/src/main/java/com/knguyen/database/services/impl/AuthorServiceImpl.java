package com.knguyen.database.services.impl;

import com.knguyen.database.domain.entities.AuthorEntity;
import com.knguyen.database.repositories.AuthorRepository;
import com.knguyen.database.services.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AuthorServiceImpl implements AuthorService {

    /**
     * + AuthorRepository Bean: We expect AuthorRepository to be a bean, a class implementation that's going to be
     * stored in Spring's context and injected. This makes sense as we used the '@Repository' annotation on it.
     * So this injection is done via our private attribute and then the constructor, totally normal and typical for dependency injection.
     *
     * So our service function will interact with this authorRepository to get data from the 'authors' table in our database.
     *
     */
    private AuthorRepository authorRepository;
    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public AuthorEntity save(AuthorEntity authorEntity) {
        return authorRepository.save(authorEntity);
    }


    @Override
    public List<AuthorEntity> findAll() {
        /*
         * + StreamSupport:
         * Used to provide utility methods when working with streams. So authorRepo.findAll() will return an iterable
         * of AuthorEntity instances, and .spliterator is called to obtain a 'Spliterator<AuthorEntity>' data structure.
         *
         * It's short for 'splitable iterator' and it's designed to be used with the stream API. It's an iterator that
         * can split itself which is useful for parallel processing. We did 'StreamSupport.stream(spliterator, false)' here
         * which means we created a stream data-structure sequentially. The takeaway is that you can't create a stream from
         * an 'iterator' class itself, so instead you turn it into a spliterator, and now you can do that stream conversion.
         *
         * Finally we return a list
         */
        return StreamSupport.stream(authorRepository
                        .findAll()
                        .spliterator(),
                        false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AuthorEntity> findOne(Long id) {
        return authorRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return authorRepository.existsById(id);
    }

    @Override
    public AuthorEntity partialUpdate(Long id, AuthorEntity authorEntity) {
        // Ensure that the Ids match
        authorEntity.setId(id);

        /*
         * 1. Attempt to get author from the database
         *
         * If the authorEntity that we passed in values for name and age (they aren't null), then
         * apply those as the name and age of the existing author we found in the database?
         */
        return authorRepository.findById(id).map(existingAuthor -> {
            Optional.ofNullable(authorEntity.getName()).ifPresent(existingAuthor::setName);
            Optional.ofNullable(authorEntity.getAge()).ifPresent(existingAuthor::setAge);

            // Save the updated author back into the repository, so that the changes are saved into the database
            return authorRepository.save(existingAuthor);
            // If author ID doesn't correspond to an existing author; this should exist since we do an existence check in the
        }).orElseThrow(() -> new RuntimeException("Author does not exist"));
    }

    @Override
    public void delete(Long id) {
        authorRepository.deleteById(id);
    }
}
