package com.example.sessionauth.entity.userdetails;

import com.example.sessionauth.entity.Employee;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;


/**
 * + UserDetails:
 * An implementation of the UserDetails interface!
 *
 *
 * + What is a record and why is EmployeeDetails a record?
 * There are times in programming where we pass immutable data between objects, especially in Java since everything is objects in Java.
 * In the olden days, there was a lot of boilerplate to achieve this, but now we can use records to achieve our goals.
 *
 * Essentially using records reduces a lot of boilerplate code. To create a class with the consideration in mind that the data is immutable:
 * 1. private final field for each piece of data.
 * 2. Getter for each field.
 * 3. A public constructor with an argument for each field.
 * 4. An equals() method that returns true when all fields match.
 * 5. hashCode() that returns the same value when all fields match.
 * 6. toString() for the class.
 *
 * If you use a record you just have to define the fields and the other methods are taken care of. So yeah you may
 * want to use a record to indicate the fields of an object are immutable, and to save some code.
 *
 * + Back to the code:
 * In this example the only field in the 'EmployeeDetails' record would be a reference to an 'Employee' entity instance. Then
 * our methods handle getting information and interacting with that instance!
 * 
 */
public record EmployeeDetails(Employee employee) implements UserDetails {

    /**
     * Get the authorities related to the user. So it seems that it returns a collection of objects that inherit the
     * 'GrantedAuthority' class. We know that this returns a 'Collection' so it can be multiple different data-structures
     *
     * + Collection:
     * Remember collections could be sets, list, queue, stack, etc and a bunch of other things. But in this case
     * .getAuthorities will return a 'set' to be more specific.
     *
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.employee.getAuthorities();
    }

    // Get the password of the employee entity
    @Override
    public String getPassword() {
        return this.employee.getPassword();
    }

    // Get the 'username'. In this case, we choose the user's unique email as the 'username'. So like they'll probably
    // use this as the main login.
    @Override
    public String getUsername() {
        return this.employee.getEmail();
    }

    /**
     * This method indicates whether the user's account has been expired. If their account is expired, then
     * the user can't be authenticated.
     *
     * Usage example: You may want to expire an account after a certain period (maybe a trial period).
     *
     * @return If true, then expired
     */
    @Override
    public boolean isAccountNonExpired() {
        return this.employee.isAccountNonExpired();
    }

    /**
     * Method indicates whether the user's account is locked. If the account is locked, the user cannot be authenticated.
     *
     * Usage example: Accounts can be locked after a certain number of failed login attempts.
     * @return If true, then account is locked
     */
    @Override
    public boolean isAccountNonLocked() {
        return this.employee.isLocked();
    }

    /**
     * Indicates whether the user's credentials (password) has expired. If they're expired then they can't
     * be authenticated.
     *
     *
     * Usage example: You may enforce a rule where users have to update their password every 90 days.
     * @return If true, then account can't be authenticated.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return this.employee.isCredentialsNonExpired();
    }

    /**
     * Indicates whether the user's account is enabled or disabled. A disabled user can't be authenticated.
     *
     * Usage example: You might disable a user's account if the user hasn't activated/verified their account via
     * email verification. Maybe the idea of disabling some features when the user is unverified.
     *
     */
    @Override
    public boolean isEnabled() {
        return employee.isEnabled();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EmployeeDetails that)) return false;
        return Objects.equals(employee, that.employee);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employee);
    }
}
