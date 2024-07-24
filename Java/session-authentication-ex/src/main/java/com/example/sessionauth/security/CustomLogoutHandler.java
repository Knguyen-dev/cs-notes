package com.example.sessionauth.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.session.data.redis.RedisIndexedSessionRepository;
import org.springframework.stereotype.Component;


/**
 * Custom component for handling one portion of our logout process. So our logout functionality is going to be all stacked
 * onto a 'LogoutFilter' in our security chain. This CustomLogoutHandler would just be one little piece of that.
 * So LogoutHandler is an interface for Spring Security that we must implement!
 *
 * + Component value and naming
 * By default, the name ofa bean is the same as the class's name, just with the first letter lowercased. For example,
 * the class 'MyCoolClass' will get teh bean name 'myCoolClass'. When we specify the value here as
 * 'customLogoutHandler', we just are explicitly setting the bean's name to that name. In this example it improves the
 * readability a bit, but the main benefits are how you can avoid naming conflicts and do explicit injection.
 *
 * 1. Avoiding naming conflicts: If there are multiple beans of the same type, but with different roles in your system, then
 * you can distinguish those beans by assigning them specific names.
 * 2. Explicit injection: When using '@Autowired' or similar annotations for dependency injection, you can specify the name
 * of the bean so that you inject the correct bean that you want. Again, this is especially useful in the case where you
 * have multiple beans of the same type
 *
 *
 */
@Component(value = "customLogoutHandler")
public class CustomLogoutHandler implements LogoutHandler {

    /**
     * redisIndexedSessionRepository: Class that lets us access stored sessions in the redis cache; injected via Spring Context.
     */
    private final FindByIndexNameSessionRepository<? extends Session> redisIndexedSessionRepository;
    public CustomLogoutHandler(RedisIndexedSessionRepository redisIndexedSessionRepository) {
        this.redisIndexedSessionRepository = redisIndexedSessionRepository;
    }

    /**
     * Method responsible for deleting user session from redis session store. So yeah this is one of the
     * ways we need to clear their data when logging out.
     *
     * @param request Request object
     * @param response Response object
     * @param authentication The Authentication object that has all of the information about the currently authenticated user
     * @return void
     * */
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        /**
         * 1. 'request.getSession(false)': This function retrieves the current HTTP session. The 'false' argument ensures that
         * doing 'request.getSession' doesn't a brand new session if there are no sessions associated with the request.
         * 2. Then 'getId()' gets the session ID.
         * 3. If id is defined, that means a session currently exists for the current request, and we get its session ID.
         * Now we'll check a second condition to see if there's a session object associated with that session ID in our redis
         * store.
         * 4. If both conditions are met, then we delete that session, which is necessary to log out the user.
         */
        String id = request.getSession(false).getId();

        if (id != null && this.redisIndexedSessionRepository.findById(id) != null) {
            this.redisIndexedSessionRepository.deleteById(id);
        }
    }
}
