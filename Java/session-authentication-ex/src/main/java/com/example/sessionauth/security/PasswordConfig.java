package com.example.sessionauth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


/**
 * So here we're setting up what algorithm we're using for hashing passwords, consequently comparing/verifying
 * passwords as well.
 */
@Configuration
public class PasswordConfig {

    // Creates a 'PasswordEncoder' bean for us; Here we're using Bcrypt to hash our passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

}
