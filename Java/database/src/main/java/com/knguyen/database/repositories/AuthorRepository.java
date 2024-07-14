package com.knguyen.database.repositories;

import com.knguyen.database.domain.entities.AuthorEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @Repository: Declares it as a bean.
 *
 * AuthorRepository:
 * So these repositories represent the persistence layer. Our service functions will interact with these 'Repositories'
 * which are basically classes that will manage each table. So if your service functions are going to get data from the
 * database about authors, then they'll interact with the AuthorRepository to do that. The AuthorRepository will just
 * provide them with some easy functions to query data.
 *
 * Extending CrudRepository:
 * By doing this, we provide a set of standard methods for performing CRUD operations on the entity. It
 * gives us basic methods like AuthorRepository.save(someAuthorEntity), .findById(someId), etc.
 *
 * As well as this, we can define custom queries using JPQL (Java Persistence Query Language), or you can choose to
 * specify a custom method in native SQL.
 */
@Repository
public interface AuthorRepository extends CrudRepository<AuthorEntity, Long> {
    Iterable<AuthorEntity> ageLessThan(int age);

    // translates to 'Select an author (entire row) from the 'authors' table where the age is greater than the first parameter we pass
    // to this method, which will be 'int age'.
    @Query("SELECT a from AuthorEntity a where a.age > ?1")
    Iterable<AuthorEntity> findAuthorsWithAgeGreaterThan(int age);
}
