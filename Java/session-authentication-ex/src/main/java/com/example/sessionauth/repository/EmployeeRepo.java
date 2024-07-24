package com.example.sessionauth.repository;

import com.example.sessionauth.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repo for accessing the Employee table
 */
@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {

    /**
     * Searches for an employee by their email. It seems that we plan to get
     * the username from the 'principal'. This refers to the currently authenticated
     *  user, and it can be any object that represents the user. It doesn't have to be a complete
     *  UserEntity, but often a "UserDetails" or a similar class that contains important user info
     *  for handling routes.
     *
     * @param email Gets employee by email
     * @return Optional Employee object because employee with email may not exist.
     */
    @Query("SELECT e FROM Employee e WHERE e.email = :email")
    Optional<Employee> findByPrincipal(@Param(value = "email") String email);
}
