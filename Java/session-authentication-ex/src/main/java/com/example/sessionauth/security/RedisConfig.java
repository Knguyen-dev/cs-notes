package com.example.sessionauth.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisIndexedHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;


/**
 * + 'RedisConfig' (Aka SessionConfig): This is just a configuration class for spring session and how that's going to work
 * with your redis session store. Essentially with the '@EnableRedisHttpSession' (or similar annotation) and extending/inheriting
 * the class 'AbstractHttpSessionApplicationInitializer' will create a 'filter' in front of all our security logic. This filter
 * will look for active sessions and populate the security context with values stored in the Redis data store.
 *
 * + Annotations:
 * 1. '@EnableRedisIndexedHttpSession': This enables Spring Session support with Redis. So this allows them to work together
 * and makes that Redis session store to work. This creates a bean called 'springSessionRepositoryFilter' which replaces
 * the standard 'HttpSession' with a Redis-supported implementation. In this instance, Spring Session
 * is supported by RedisIndexedSessionRepository.
 * 2. '@Slf4j': Lombok annotation that adds a logger instance to the class. As a result, this allows for logging within
 * the class methods.
 *
 * */
@Configuration @EnableRedisIndexedHttpSession @Slf4j
public class RedisConfig extends AbstractHttpSessionApplicationInitializer {

    // Expecting a 'RedisProperties' bean, which contains the host, the port, and the password it seems for setting up our redis connection
    private final RedisProperties redisProperties;
    public RedisConfig(RedisProperties redisProperties) {
        this.redisProperties = redisProperties;
    }

    /**
     * 'LettuceConnectionFactory': Also known as a 'RedisConnectionFactory', this is used to connect Spring Session to our
     * Redis server that we're running. We configure it to connect to localhost and default port 6379.
     *
     *
     * + Lettuce vs Jedis:
     * There are two main redis clients (APis that allow us to connect and interact with Redis servers in Java). Jedis is
     * a widely used one, whilst Lettuce is another widely used one. Both of them have this core idea of 'connection factories'.
     * Connection factories are your methods or logic that is used to create new connections to the Redis data store. So
     * when you hear about 'connection factories' and 'lettuce' vs 'Jedis', this is what they're talking about.
     *
     * */
    @Bean
    public LettuceConnectionFactory connectionFactory() {
        RedisStandaloneConfiguration configuration =
                new RedisStandaloneConfiguration(this.redisProperties.getHost(), this.redisProperties.getPort());
        configuration.setPassword(redisProperties.getPassword());
        return new LettuceConnectionFactory(configuration);
    }

    /**
     * Method allows placing constraints on a single user’s ability to log in to your application. After creating this
     * listener, in your security chain you can now indicate the maximum number of sessions you want a user to have.
     * For example, if you say '1', then can only be logged in 1 at a time. If they try logging in from multiple places
     * we will invalidate the previous login and give room to the next one.
     * */
    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

}
