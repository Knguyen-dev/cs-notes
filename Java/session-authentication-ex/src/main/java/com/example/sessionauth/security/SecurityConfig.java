package com.example.sessionauth.security;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.session.Session;
import org.springframework.session.data.redis.RedisIndexedSessionRepository;
import org.springframework.session.security.SpringSessionBackedSessionRegistry;
import static org.springframework.security.config.http.SessionCreationPolicy.IF_REQUIRED;


/**
 * SecurityConfig: The main place where all of our Security related components come and work together.
 *
 * + Annotations:
 * '@EnableWebSecurity': Enables Spring Security's web security support and provides Spring Security Configurations for the application. 
 *  It applies security constraints to web requests, allows you to configure security settings if you want to move from the defaults. Commonly used in conjunction
 *  with the SecurityConfig and when making the app's SecurityFilterChain. More concretely it allows us to customize authentication, authorization, CORS, CSRF,
 *  and other things!
 * '@EnableMethodSecurity': Enable method-level security annotations, such as '@PreAuthorize', '@Secured', '@RolesAllowed', and others. Basically it allows us to 
 *  specify security constraints on methods in your service or controller classes.  
 *
 *
 */
@Configuration @EnableWebSecurity @EnableMethodSecurity
public class SecurityConfig {

    /**
     * + '@Value' annotation:
     * In Spring, this injects values from your application.yml or 'properties' files into the field., method parameters,
     * method return types, etc. In this case, we expect to have a property 'custom.max.session' (nested property) in our
     * application.yml file.
     */
    @Value(value = "${custom.max.session}")
    private int maxSession;

    // Class we use to store session data in our redis server and interact with the server.
    private final RedisIndexedSessionRepository redisIndexedSessionRepository;

    // Class for encoding passwords and comparing passwords
    private final PasswordEncoder passwordEncoder;

    // Our implementation of AuthenticationEntryPoint
    private final AuthenticationEntryPoint authEntryPoint;

    // Tries to fetch a user from the database given some credentials.
    private final UserDetailsService detailsService;

    // Constructor; we're expecting four beans here; We used 'qualifier' to get specific beans via their bean names
    // NOTE: Don't really need to specify the qualifiers since there should only be one AuthenticationEntryPoint bean and one UserDetailsService bean
    public SecurityConfig(
            RedisIndexedSessionRepository redisIndexedSessionRepository,
            PasswordEncoder passwordEncoder,
            @Qualifier(value = "authEntryPoint") AuthenticationEntryPoint authEntryPoint,
            @Qualifier(value = "detailService") UserDetailsService detailsService
    ) {

        // Assign the beans
        this.redisIndexedSessionRepository = redisIndexedSessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.authEntryPoint = authEntryPoint;
        this.detailsService = detailsService;
    }

    /**
     * + AuthenticationProviders:
     * Remember this is basically the class for verifying the credentials. We'd have some unverified credentials in a 'Authentication' object,
     * and this class will ask whether or not those credentials are correct. So we're creating an 'AuthenticationProvider'
     * bean, and for now we'll only have one AuthenticationProvider. If you want to have multiple beans, then you'll definitely
     * need to use qualifiers to distinguish them.
     *
     * 1. Create a 'DaoAuthenticationProivder'. This makes sense as we're going to validate user credentials against our own database with a UserDetailsService.
     * 2. We're providing the PasswordEncoder component that our app is using
     * 3. Provide the implementation of the UserDetailsService
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(this.passwordEncoder);
        provider.setUserDetailsService(this.detailsService);
        return provider;
    }

    /**
     * Create your AuthenticationManager bean, using the method to create our authentication provider.
     *
     * + How beans and dependency injection works in this case
     * So far we've only seen dependency injection when we declare a constructor, and then the Spring context injects those dependencies
     * for us. Remember that beans are actually created when Spring sees that they're actually needed in the code.
     *
     * When we call 'authenticationProvider()' we create a new DaoAuthenticationProvider, configure it, and register it as a bean. This process
     * only happens once per bean definition, so subsequent calls to authenticationProvider will just return a reference to this bean, not create a new one.
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(authenticationProvider());
    }

    /**
     * + SecurityFilterChain:
     * Here we create a function that would create a bean for a SecurityFilterChain! More specifically we're configuring
     * and creating our security filter chain, and this will be responsible for processing requests. So let's talk about
     * the various configurations we're applying
     *
     * + crsf(AbstractHttpConfigurer::disable):
     * Disables CSRF protection.
     *
     * + cors(Customer.withDefaults()):
     * Enables CORS with default settings. As a result, another origin is allowed to make requests ot our API.
     * Then I'm assuming that Spring will use the 'CorsConfigurationSource' bean to get our Cors configuration.
     *
     * + authorizeHttpRequests:
     * Configures authorization rules for HTTP requests
     * 1. requestMatchers("/api/v1/auth/register", "/api/v1/auth/login").permitAll(): Specifies that the /api/v1/auth/register and /api/v1/auth/login endpoints are accessible without authentication.
     * 2. anyRequest().authenticated(): Requires authentication for all other requests.
     *
     * + sessionManagement:
     * Configures session management logic in our Spring application
     * 1. sessionCreationPolicy(IF_REQUIRED): Sessions will only be created only if they're needed. Here are the other options:
     * - always: A session will always be created if one doesn't already exist.
     * - never: Will never create a session, but use one if it already exists.
     * - stateless: No sessions will be created, which is good for stateless applications.
     *
     * 2. sessionFixation(SessionManagementConfigurer.SessionFixationConfigurer::newSession): A new session will be created
     *    after the user successfully logs in. This configures the idea of 'session fixation' which is a security procedure that
     *    helps reduce session hijacking.
     * 3. maximumSessions(maxSession): Limits the number of sessions that a user would have
     * 4. sessionRegistry(sessionRegistry()): Associates a 'SessionRegistry' bean, which keeps track of user sessions.
     *
     * + exceptionHandling:
     * Configures how we handle exceptions. So we need to specify a class or custom entry point that handles
     * authentication related exceptions. We have a class for this called 'AuthEntryPoint', so we'll put it to use here.
     *
     * + Logout logic:
     * Configures user logout behavior
     * 1. logoutUrl("/api/v1/auth/logout"): Defines the URL for logout requests. So when the user hits this endpoint, then the logic process starts.
     * 2. invalidateHttpSession(true): Invalidates the HTTP session on logout. A session is also stored on the server 'servlet container'. So when we invalidate
     * a session with this code, we're invalidating the session stored in-memory.
     *
     * 3. deleteCookies("JSESSIONID"): Deletes the specified cookies on logout; so this would remove the cookie from the client's browser.
     * 4. addLogoutHandler(new CustomLogoutHandler(this.redisIndexedSessionRepository)): Adds a custom logout handler that can perform additional logout actions, such as handling session cleanup with Redis.
     * 5. logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext()): Defines a handler to execute after a successful logout. It clears the security context.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/api/v1/auth/register", "/api/v1/auth/login").permitAll();
                    auth.anyRequest().authenticated();
                })
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(IF_REQUIRED) //
                        .sessionFixation(SessionManagementConfigurer.SessionFixationConfigurer::newSession) //
                        .maximumSessions(maxSession) //
                        .sessionRegistry(sessionRegistry())
                )
                .exceptionHandling((ex) -> ex.authenticationEntryPoint(this.authEntryPoint))
                .logout(out -> out
                        .logoutUrl("/api/v1/auth/logout")
                        .invalidateHttpSession(true) // Invalidate all sessions after logout
                        .deleteCookies("JSESSIONID")
                        .addLogoutHandler(new CustomLogoutHandler(this.redisIndexedSessionRepository))
                        .logoutSuccessHandler((request, response, authentication) ->
                                SecurityContextHolder.clearContext()
                        )
                )
                .build();
    }

    /**
     * Maintains a registry of Session information instances.
     *
     * Code Example: <a href="https://github.com/spring-projects/spring-session/blob/main/spring-session-docs/modules/ROOT/examples/java/docs/security/SecurityConfiguration.java">...</a>
     * **/
    @Bean
    public SpringSessionBackedSessionRegistry<? extends Session> sessionRegistry() {
        return new SpringSessionBackedSessionRegistry<>(this.redisIndexedSessionRepository);
    }

    /** A SecurityContextRepository implementation which stores the security context in the HttpSession between requests. */
    @Bean
    public SecurityContextRepository securityContextRepository() {
      return new HttpSessionSecurityContextRepository();
    }

}
