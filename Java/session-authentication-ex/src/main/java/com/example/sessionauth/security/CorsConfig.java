package com.example.sessionauth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpHeaders.CONTENT_TYPE;

@Configuration
public class CorsConfig {

    /**
     * Function for creating our 'CorsConfigurationSource' bean.
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        /**
         *
         * Allow 'localhost:4200' to access the endpoint without being blocked by CORS since they're different origins.
         * Our 'localhost' would be our client-side application that's using this rest-api. This could be a react-app, angular, or
         * any kind of front-end app. So here you're deciding who gets to make the request at all, and that should just be
         * our front-end application.
         *
         *
         */
        configuration.setAllowedOrigins(List.of("http://localhost:4200/"));

        /**
         * It seems like we're deciding, okay so what endpoints are people in our allowed origins able to hit? So it
         * seems like we said essentially all types of requests are allowed.
         *
         *
         * + What is the 'OPTIONS' Method:
         * The 'OPTIONS' HTTP method is used by browsers to determine if a request is safe to send. It's used for a
         * 'preflight' request, which tells the server what you're gonna do, and the server just makes sure everything is
         * ok before either accepting or rejecting your request.
         *
         * NOTE: 'OPTIONS' is included because it's used to send CORS pre-flight requests to determine whether the
         */
        configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE", "OPTIONS"));

        // Defined our allowed headers, so right now we allowed the 'Content-Type' header.
        configuration.setAllowedHeaders(List.of(CONTENT_TYPE));

        /**
         * Allows cookies to be included in cross-origin requests. So it allows the browser to include cookies in requests, and
         * when the server sets cookies in the response, these cookies are exposed and given to the client!
         */
        configuration.setAllowCredentials(true);

        /**
         * Creates a 'UrlBasedCorsConfigurationSource'. So basically we're going to apply the cors setting we just
         * configured to all of our endpoints! So these specified CORS settings will be applied to all requests in our
         * application!
         */
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
