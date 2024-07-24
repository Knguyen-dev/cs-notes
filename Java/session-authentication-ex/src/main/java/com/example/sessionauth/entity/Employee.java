package com.example.sessionauth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.EAGER;

/**
 * The 'EmployeeEntity' class, which is responsble for creating Employee objects that'll be returned from the persistence
 * layer. It implements 'Serializable', which means now it can be serialized (converted and sent as a stream of bytes).
 * + Credits:
 *
 * 1. Eager vs lazy: https://stackoverflow.com/questions/26891658/what-is-the-difference-between-fetch-eager-and-fetch-lazy-in-doctrine
 * 2. JoinColumns vs mappedBy (relationships in hibernate): https://www.baeldung.com/jpa-joincolumn-vs-mappedby
 * 3. CascadeType.REMOVE vs orphanRemoval: https://www.baeldung.com/jpa-cascade-remove-vs-orphanremoval
 */
@Table(name = "EMPLOYEE") @Entity
@NoArgsConstructor @Getter @Setter
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long employeeID;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    // When converting into JSON and ultimately sending this back, exclude the password field
    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    // Likely related to verifying your email and 'activating' a user account
    /**
     * Maybe you don't want to use things such as locked, account expired, etc. If so, just
     * make functions like 'isAccountNonExpired' always return true, so it passes the Spring security
     * checks.
     *
     */
    @Column(name = "account_enable")
    private boolean enabled;

    @Column(name = "credentials_expired")
    private boolean credentialsNonExpired;

    @Column(name = "account_expired")
    private boolean accountNonExpired;

    // likely related to administrators being able to lock accounts
    @Column(name = "account_locked")
    private boolean locked;

    /**
     * When sending back information to the user, we exclude their role. So roles seem to be
     * something that shouldn't be sent back to users, but handled in the backend with authentication
     * and role-based access.
     *
     * An employee seems to be able to have 1 or many roles. So we'll store the multiple roles in another table.
     *
     *
     * + cacades:
     * 1. persist: When a new Employee is saved, any new roles are saved into the database as well.
     * 2. merge: When an existing employee is updated, we update existing roles and also insert any new roles into the database.
     * 3. remove: When a user is deleted, any roles refencing them in the role table are removed as well to prevent integrity violations.
     *
     * + fetch:
     * 1. eager: When querying and returning this Employee from the persistence layer, the associated role object from
     * the 'Roles' table is fetched as well.
     *
     * 2. lazy: When the employee is fetched, a 'dummy' object is replaced for role. It is only when we explicitly do a
     * function call or access it that it actually does a database query and gets the role from the database. So there's
     * a chance we'll do an additional SQL query, only if we need to.
     *
     * + Relationships Intro:
     * relationships in JPA can be unidirectional or bi-directional. So you can have an attribute on one entity or both of
     * the associated entities. For example, 'Employee' and 'Email' tables, where an employee can have multiple emails, but an email
     * can only reference one employee.
     *
     *
     * 1. 'JoinColumn': Specifies the column we'll use when doing
     * doing an SQL join with another table, and it executes that join with the other entity you listed.
     * So 'JoinColumn' annotation is usually defined on the 'many/owning' side. So it'd be defined
     * on the Email entity. So 'Email' basically has a foreign key 'employee_id' kind of. And when we fetch
     * an Email, we get the entire Employee object associated with it.
     *
     * 2. 'mappedBy': So without mappedBy Hibernate already has all the info it needs to map this relationship.
     * by doing 'mappedBy' we make the relationship bi-directional. So we just have to define the 'owning/one' side of
     * the one-to-many which would be the 'employee'. As a result you can get all of the emails in the email table
     * associated with the employee in a list, when you fetch the employee.
     *
     * Takeaway: Use JoinColumn in the many portion, acts as a foreign key to get a single row from another table. Use
     * 'mappedBy' in the 'one' side of the relationship, so that you can get the many objects associated with the one thing.
     *
     * - Back to the code:
     * So here, we know that an employee can have many rows. So we use mappedBy to define the owning table of the
     * relationship. So when an employee is fetched, we get all of the roles associated with the employee. It seems
     * like in hashmap, so I don't know the keys and values of how it does things.
     *
     * + cascade.remove vs orphanRemoval:
     *
     * - An example:
     * An 'OrderRequest' will have/reference a 'ShipmentInfo', and it will also have/be referenced by a list of
     * LineItems. So OrderRequest to ShipmentInfo (one to one), and a OrderRequest to LineItem (1 to many).
     *
     * 1. CascadeType.REMOVE: A way to delete a child entity, or multiple when the parent is deleted. So when OrderRequest is deleted
     * then delete the associated ShipmentInfo row that it references.
     * 2. orphanRemoval: An orphaned entity is one where it no longer references its parent. This targets the case where
     * when we remove a specific child from its parent, and so that child is now an orphan so we delete it from the database as well.
     * In our example, OrderRequest has a 1-MANY relationship with LineItem, so we'll do orphanRemoval configurations
     * here! So if we delete/remove a LineItem from our LineItem list, it will detach the LineItem from the OrderRequest
     * thus making it an orphan and then we'll delete it from the database.
     *
     * Takeaway: Cascade is focuses the deletion of the parent,  and so deleting the parent will delete all children. The
     * orphanRemoval focuses  removing the children . If you have a choice when removing children that are associated
     * with the parent, this is good as when you remove those children (sever the relationship) then you'll delete the child also.
     *
     * Back to the code: So we set cascade.remove, which means once an employee is deleted, all roles that reference
     * the employee are removed as well. However since we have orphanRemoval, if we remove a role for an employee, then
     * that orphaned role can we easily deleted.
     *
     */
    @JsonIgnore
    @OneToMany(cascade = {PERSIST, MERGE, REMOVE}, fetch = EAGER, mappedBy = "employee", orphanRemoval = true)
    private Set<Role> roles = new HashSet<>();

    /**
     * Method for adding a role to an employee. This method is needed for establishing and maintaining the bi-directional
     * relationship between Employee and Role.
     *
     * 1. Needed for maintaining consistency in our application state data, which will turn into database data when you do
     * .save method on our EmployeeRepository. So you'd save the employee, and due to cascades the
     * appropriate Role entities are saved persisted (added) or merged (updated) in the database as well
     *
     * 2. Also needed to tell Spring about the relationship. The orm needs to be able to correctly manage and persist the relationship.
     *
     * @param role Role we are adding to the Employee
     */
    public void addRole(Role role) {

        // Employee adds role to the set.
        this.roles.add(role);

        // Role references the one employee
        role.setEmployee(this);
    }

    /**
     * + GrantedAuthority and our getAuthorities() method:
     * Remember an authority is just an interface, an idea that represents a role, permission, or something similar that
     * gives the user's special privileges or 'authority' to do something. For the UserDetails implementation, we need
     * a method to get the authorities of a user, so here we are.
     *
     * @return We'll just convert our list of roles into a set of 'SimpleGrantedAuthority' instances. This is just a concrete
     * implementation of the 'GrantedAuthority' interface, where it uses strings to represent the authority values.
     * We'll pass in the role (it's an enum so we need to convert it into a string to fit the interface). We're using a
     * set to ensure that there are no duplicate roles (authorities).
     */
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this
                .roles
                .stream() //
                .map(role -> new SimpleGrantedAuthority(role.getRoleEnum().toString()))
                .collect(Collectors.toSet());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee employee)) return false;
        return isEnabled() == employee.isEnabled()
                && isCredentialsNonExpired() == employee.isCredentialsNonExpired()
                && isAccountNonExpired() == employee.isAccountNonExpired()
                && isLocked() == employee.isLocked()
                && Objects.equals(getEmployeeID(), employee.getEmployeeID())
                && Objects.equals(getEmail(), employee.getEmail())
                && Objects.equals(getPassword(), employee.getPassword())
                && Objects.equals(getRoles(), employee.getRoles());
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                getEmployeeID(),
                getEmail(),
                getPassword(),
                isEnabled(),
                isCredentialsNonExpired(),
                isAccountNonExpired(),
                isLocked(),
                getRoles()
        );
    }

}
