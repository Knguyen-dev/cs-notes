package com.knguyen.database.repositories;

import com.knguyen.database.domain.entities.BookEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<BookEntity, String>,

        // We'll extend this as well to get some pagination functionality
        PagingAndSortingRepository<BookEntity, String> {
}
