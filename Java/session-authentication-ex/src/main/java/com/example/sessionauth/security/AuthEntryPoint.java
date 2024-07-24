package com.example.sessionauth.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;





















/**
 *
 *
 * + Spring Security Exceptions
 * Coming from the ControlllerAdvice.java, we know that ControllerAdvice and its exception handlers will catch and process
 * errors that are caught in the controller layer. However, Spring Security Core exceptions such as 'AuthenticationException'
 * and 'AccessDeniedExceptions' are thrown by authentication filter functions, behind the DispatcherServlet and before
 * our controller methods are even invoked. So by default ControllerAdvice won't be able to get these errors.
 *
 * To solve this we need a custom implementation of 'AuthenticationEntryPoint'. Spring Security exceptions start at 'AuthenticationEntryPoint', so
 * if we catch, process, or redirect them here, then we'd be able to handle these exceptions as well! So in the end the purpose of
 * AuthenticationEntryPoint is to handle these authentication related exceptions!
 *
 * + AuthenticationEntryPoint:
 * Role and Function: AuthenticationEntryPoint acts as a filter and is the initial point of contact for handling authentication issues within Spring Security. It's invoked when an unauthenticated client attempts to access protected resources or when authentication errors occur during the authentication process.
 *
 * - Common Uses:
 * 1. Redirecting to Login: It can redirect unauthenticated users to a login page if they attempt to access a protected resource.
 * 2. Requesting Credentials: For APIs, it might return a response indicating that credentials are required, often with a 401 Unauthorized status.
 * - Our Project's Implementation:
 * Instead of directly handling authentication exceptions, your project uses AuthenticationEntryPoint to pass these exceptions to HandlerExceptionResolver.
 * This approach centralizes exception handling by routing all exceptions, including those from authentication failures, to @ControllerAdvice. This allows for consistent and unified error handling across the application.
 * */
@Component(value = "authEntryPoint")
public class AuthEntryPoint implements AuthenticationEntryPoint {

    /**
     * 'HandlerExceptionResolver': We expect this bean, and it allows us to handle exceptions in a centralized way. So
     * if we do get AuthenticationExceptions, then they can be redirected to our ControllerAdvice!
     *
     * + Qualifier:
     * Ensures that the specific 'handlerExceptionResolver' bean is injected.
     *
     */
    private final HandlerExceptionResolver resolver;
    public AuthEntryPoint(@Qualifier(value = "handlerExceptionResolver") HandlerExceptionResolver resolver) {
        this.resolver = resolver;
    }

    /**
     * When an AuthenticationException happens, this function is called. It seems that by doing this, we can redirect
     * those AuthenticationException errors to the ControllerAdvice. This allows ControllerAdvice to receive 'AuthenticationException'
     * errors, and so that's why we setup a '@ExceptionHandler' in ControllerAdvice!
     *
     * NOTE: Though it seems IOException and ServletException are thrown, but I don't think we catch them in ControllerAdvice?
     *
     * @param request
     * @param response
     * @param authException
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        this.resolver.resolveException(request, response, null, authException);
    }

}
