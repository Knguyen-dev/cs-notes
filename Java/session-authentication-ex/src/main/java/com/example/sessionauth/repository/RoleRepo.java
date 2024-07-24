package com.example.sessionauth.repository;

import com.example.sessionauth.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * They're using enumerations for roles 'anonymous', 'employee', and 'admin'. But I guess since
 * they created this repository, they're probably using a lookup table. So the roles are
 * officially stored as enumerations in the application, and also in the database.
 *
 * The reason we do this is because an Employee can have multiple roles. So instead of having an
 * attribute called 'role' on employee that's only one value, we'll have a table with the role values that a user has.
 *
 */
@Repository
public interface RoleRepo extends JpaRepository<Role, Long> { }
