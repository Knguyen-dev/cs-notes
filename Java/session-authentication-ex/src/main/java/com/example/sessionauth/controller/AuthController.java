package com.example.sessionauth.controller;

import com.example.sessionauth.dto.AuthDTO;
import com.example.sessionauth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(path = "/api/v1/auth")
public class AuthController {

    // Expecting us to inject the AuthService as a dependency
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Public route for signing up users
     *
     * @param authDTO
     * @return ResponseEntity
     * **/
    @PostMapping(path = "/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthDTO authDTO) {
        // Sends back this response, note that this.authService.register could throw an error that'll be caught in the ControllerAdvice
        return ResponseEntity
                .status(CREATED)
                .body(this.authService.register(authDTO));
    }

    /**
     * Public route that allows users (our employees in this case) to login to their existing accounts!
     * So logging in does require us to pass in the request and response objects to our login function. This is
     * for doing things such as session-management and whatnot.
     *
     * NOTE: In our AuthController, note how the only two public routes are the 'registration' and 'login' routes.
     * For the rest, we expect to be able to authenticate the user from the request.
     *
     * @param authDTO We expect the request body to be in a valid form for our AuthDTO.
     * @param request Http request object
     * @param response Http response object
     * @return Just a string saying they logged in
     * **/
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(
            @Valid @RequestBody AuthDTO authDTO,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return new ResponseEntity<>(authService.login(authDTO, request, response), OK);
    }


    /**
     * Protected route only employees with the role ADMIN can hit.
     *
     * + What is the '@PreAuthorize' annotation?
     * Used to apply method-level security in Spring applications. It ensures a method can only be
     * invoked by users who meet certain criteria. In this case, we are restricting access to a controller route,
     * and the value 'hasAuthority('ADMIN')' specifies that only users with the 'ADMIN' authority can access this method.
     *
     * + How it works
     * Spring will check the authentication object as it contains the user's authorities (roles/permissions).
     * It will use the 'getAuthorities()' method of the 'Authentication' object to retrieve the user's authorities.
     * Then it checks if any of the granted authorities match the string 'ADMIN'.
     * Behind the scenes, a component named 'MethodSecurityExpressionHandler' handles evaluating the security expression.
     *
     * @param authentication The authentication object representing the current user's authentication details.
     * @return String A message containing the admin's name.
     */
    @GetMapping(path = "/authenticated")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public String getAuthenticated(Authentication authentication) {
        return "Admin name is " + authentication.getName();
    }

    /**
    * Protected route. Any authenticated employee can his this. So you just have to be a logged in user to be able to
     * hit this route.
    *
    * @param authentication
    * @return String
    * **/
    @GetMapping(path = "/employee")
    public String onlyEmployeesCanHitThisRoute(Authentication authentication) {
        return "An Admin or Employee can hit this rout. Employees name is " + authentication.getName();
    }

}
