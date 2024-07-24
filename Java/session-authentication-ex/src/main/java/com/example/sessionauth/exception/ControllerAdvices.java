package com.example.sessionauth.exception;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.springframework.core.Ordered.HIGHEST_PRECEDENCE;
import static org.springframework.http.HttpStatus.*;

/**
 * - ControllerAdvice: An intercepting middleware that can be used to surround/wrap our controller logic. This allows us to apply
 * some common logic to our controllers. So you'd put this annotation on a class. Then the methods of this 'ControllerAdvice'
 * class will be annotated with 'ExceptionHandler'
 *
 * - ExceptionHandler: This is used to defne a function that will catch certain errors from our controllers. So our various
 * ExceptionHandlers will be shared globally across multiple components with the '@Controller' annotation.
 *
 * + '@Order':
 * Order annotation in Spring is used to define the execution order of components. So 'HIGHEST_PRECEDENCE' ensures that
 * this component (still a bean) is executed, and created/injected into Spring context before other components.
 * Apparently here it just ensures that the exception handlers defined in this class will be considered first when handling
 * exceptions across the application.
 *
 * + Error propagation:
 * In order for the error to be caught by the ControllerAdvice's exception handlers, it must be propagated up to the
 * controller level. So if you were using a userService.findUserByEmail(), and you throw and handle an exception
 * inside the service function, that was never propagated up to the controller layer. So if that exception matched
 * one of the cases handled by our exception handlers, then we wouldn't have been able to catch or process it.
 *
 */
@ControllerAdvice
@Order(HIGHEST_PRECEDENCE)
public class ControllerAdvices extends ResponseEntityExceptionHandler {

    /**
     * So we defined 'ExceptionDetails' which is the uniform error object that will be sent back (in json format) from
     * the server to the client.
     * @param message The error message
     * @param httpStatus The response's status code.
     * @param timestamp Timestamp for the error
     */
    private record ExceptionDetails(String message, HttpStatus httpStatus, ZonedDateTime timestamp) { }

    /**
     * Exception handler will handle server-side exceptions. So there are runtime, unsupported operators, and
     * illegal state errors. I don't know about all three of the errors, but I'm guessing these are errors that happen
     * server-side, usually due to bad code. So it'll be a status 500, with the application error message.
     *
     * NOTE: So the name of the method is runTimeException, but within our '@ExceptionHandler' annotation we define
     * that we'll catch runtime exceptions and other types of exceptions from our controllers.
     */
    @ExceptionHandler(value = {RuntimeException.class, UnsupportedOperationException.class, IllegalStateException.class})
    public ResponseEntity<?> runTimeException(Exception ex) {
        var exceptionDetails = new ExceptionDetails(
                ex.getMessage(),
                INTERNAL_SERVER_ERROR,
                ZonedDateTime.now(ZoneId.of("UTC"))
        );
        return new ResponseEntity<>(exceptionDetails, INTERNAL_SERVER_ERROR);
    }

    /**
     * So this handles any errors thrown when we have issues in the auhtentication process specifically. So I'm guessing
     * things such as user not found with said 'username', user account being locked, not verified, etc.
     */
    @ExceptionHandler(value = {AuthenticationException.class})
    public ResponseEntity<?> authenticationException(Exception e) {
        var exceptionDetails = new ExceptionDetails(
                e.getMessage(),
                UNAUTHORIZED,
                ZonedDateTime.now(ZoneId.of("UTC"))
        );
        return new ResponseEntity<>(exceptionDetails, UNAUTHORIZED);
    }

    /**
     * So this will catch  'AccessDeniedException' errors from our controllers. So we'll return
     * a 403 forbidden. This can happen in cases where the user accesses routes that are protected by roles that
     * they don't have.
     */
    @ExceptionHandler(value = {AccessDeniedException.class})
    public ResponseEntity<?> accessDenied(Exception e) {
        var exceptionDetails = new ExceptionDetails(
                e.getMessage(),
                FORBIDDEN,
                ZonedDateTime.now(ZoneId.of("UTC"))
        );
        return new ResponseEntity<>(exceptionDetails, FORBIDDEN);
    }
}