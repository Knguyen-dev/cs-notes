package com.example.sessionauth.entity.userdetails;

import com.example.sessionauth.repository.EmployeeRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Sn implementation of 'UserDetailsService'. I guess here the idea is querying a potential employee
 * from the database. So kind of like an EmployeeDetailsService, but they are probably right about naming it 'DetailService'
 * because it will involve just user authentication
 */

@Service(value = "detailService")
public class DetailService implements UserDetailsService {

    // We expect the EmployeeRepo bean to be setup and injected
    private final EmployeeRepo employeeRepo;
    public DetailService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    /**
     * + loadUserByUsername(String): So this is the only method required by the UserDetailsService interface.
     *
     *
     * @param principal The unique identifier that we'll use to fetch the user. This could be a username, email, id, etc.
     *                  It just needs to identify the user. In the UserDetailsService interface this parameter is called 'username'
     *                  so that's where this idea comes from. In this case, our 'principal' will be an email value as
     *                  findByPrincipal finds users by email.
     * @return An implementation of the UserDetails interface.
     * @throws UsernameNotFoundException So we throw this exception when we didn't find the user with the appropriate username/principal
     */
    @Override
    public UserDetails loadUserByUsername(String principal) throws UsernameNotFoundException {
        return this
                .employeeRepo
                .findByPrincipal(principal)
                .map(EmployeeDetails::new) //
                .orElseThrow(() -> new UsernameNotFoundException(principal + " not found"));
    }
}
