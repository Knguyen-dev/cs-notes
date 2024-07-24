package com.example.sessionauth.service;

import com.example.sessionauth.dto.AuthDTO;
import com.example.sessionauth.entity.Employee;
import com.example.sessionauth.entity.Role;
import com.example.sessionauth.enumeration.RoleEnum;
import com.example.sessionauth.repository.EmployeeRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.session.data.redis.RedisIndexedSessionRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service @Setter
public class AuthService {

    // We're expecting the max session count and administrator email from our properties file
    @Value(value = "${custom.max.session}")
    private int maxSession;

    @Value(value = "${admin.email}")
    private String adminEmail;


    /**
     * + Beans that we're expecting and where they came from:
     *
     * 1. EmployeeRepo: Created the bean for this in our repository package
     * 2. PasswordEncoder: Created the bean for this in our security package
     * 3. SecurityContextRepository: Created a bean for this in SecurityConfig
     * 4. SecurityContextHolderStrategy: Seems to be completely imported from a library. I don't remember creating this bean in our code
     * 5. AuthenticationManager: We created this in our SecurityConfig
     * 6. RedisIndexedSessionRepository: I think we imported this from Redis Library, I don't remember creating a bean for this.
     * 7. SessionRegistry: This bean is created in SecurityConfig in the method sessionRegistry()
     */
    private final EmployeeRepo employeeRepository;

    private final PasswordEncoder passwordEncoder;

    private final SecurityContextRepository securityContextRepository;

    private final SecurityContextHolderStrategy securityContextHolderStrategy;

    private final AuthenticationManager authManager;

    private final RedisIndexedSessionRepository redisIndexedSessionRepository;

    private final SessionRegistry sessionRegistry;

    // Constructor
    public AuthService(
            EmployeeRepo employeeRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authManager,
            RedisIndexedSessionRepository redisIndexedSessionRepository,
            SessionRegistry sessionRegistry,
            SecurityContextRepository securityContextRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
        this.redisIndexedSessionRepository = redisIndexedSessionRepository;
        this.sessionRegistry = sessionRegistry;
        this.securityContextRepository = securityContextRepository;
        this.securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
    }

    /**
     * Method responsible for registering an employee
     *
     * @param dto is an object that contains user credentials
     * @throws IllegalStateException is thrown when a user email does not exist
     * @return String
     * **/
    public String register(AuthDTO dto) {
        String email = dto.email().trim();

        Optional<Employee> exists = employeeRepository
                .findByPrincipal(email);

        if (exists.isPresent()) {
            throw new IllegalStateException(email + " exists");
        }

        // Create Entity object represents new employee and save that new employee into the database
        var employee = new Employee();
        employee.setEmail(email);
        employee.setPassword(passwordEncoder.encode(dto.password()));
        employee.setLocked(true);
        employee.setAccountNonExpired(true);
        employee.setCredentialsNonExpired(true);
        employee.setEnabled(true);
        employee.addRole(new Role(RoleEnum.EMPLOYEE));


        if (adminEmail.equals(email)) {
            employee.addRole(new Role(RoleEnum.ADMIN));
        }

        employeeRepository.save(employee);
        return "Register!";
    }

    /**
     * + How the route AND service would work:
     * 1. We should have a SecurityContextRepository bean
     * 2. In our AuthController's login controller we should pass in the request and response objects
     * 3. Create an unauthenticated 'UsernamePasswordAuthenticationToken' using the credentials that were given.
     * 4. Now make a call to your AuthenticationManager with said token, which will attempt to verify whether the credentials are good and map to an existing user.
     * If you make it past this, then a user with those credentials exists in the database. However, you may have some other
     * conditions after this such as session constraints, maybe the user can't log in until they've verified their email, or maybe
     * their account is banned/locked. Those are extra things you can think about and add onto
     * 5. Create a 'SecurityContext' object and 'set' the 'Authentication' object onto it. Now our Security context object
     * will contain the information for the currently authenticated user. Then you just save that SecurityContext into our
     * SecurityContext Repository.
     *
     *
     * After an employee is authenticated via the auth manager, I am manually storing the authentication
     * For a better understanding, click the link below
     * <a href="https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html">...</a>
     *
     * @param dto is a record. It accepts email and password
     * @param request of type HttpServletRequest
     * @param response of type HttpServletResponse
     * @return String
     * **/
    public String login(AuthDTO dto, HttpServletRequest request, HttpServletResponse response) {
        // Validate User credentials
        Authentication authentication = authManager.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(
                dto.email().trim(), dto.password()));

        // I'm guessing at this point user exists with those credentials, but you may have other conditions; Validate session constraint is not exceeded;
        validateMaxSession(authentication);

        // Create a new context
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        /**
         * Update SecurityContextHolder and Strategy
         *
         * + SecurityContextHolderStrategy:
         * An interface used by 'SecurityContextHolder' to manage the 'SecurityContext'. It just handles how our security
         * context is stored and received. One of the main benefits of using it is how it's very safe to use. Without it
         * there could be race conditions when multiple places in your app are trying to access the 'SecurityContext'.
         * That's all we need to know
         *
         * + Saving to 'SecurityContextRepository':
         * Involves creating or updating an HTTP session. Our 'SecurityContext' is associated with new session. According
         * to the SecurityConfig, we should create a new session ID for the user, update session data in our redis session store,
         * and send the session ID back to the client as a cookie so that the client can use it in later requests. 
         *
         *
         */
        this.securityContextHolderStrategy.setContext(context);
        this.securityContextRepository.saveContext(context, request, response);

        return "Logged In!";
    }

    /**
     * Method is responsible for validating user session is not exceeded. If it has been exceeded, the oldest valid
     * session is removed/ invalidated
     *
     * @param authentication of type Spring Core Authentication
     * */
    private void validateMaxSession(Authentication authentication) {
        // If max session is negative means unlimited session
        if (maxSession <= 0) {
            return;
        }

        var principal = (UserDetails) authentication.getPrincipal();
        List<SessionInformation> sessions = this.sessionRegistry.getAllSessions(principal, false);

        if (sessions.size() >= maxSession) {
            sessions.stream() //
                    // Gets the oldest session
                    .min(Comparator.comparing(SessionInformation::getLastRequest)) //
                    .ifPresent(sessionInfo -> this.redisIndexedSessionRepository.deleteById(sessionInfo.getSessionId()));
        }
    }

}
