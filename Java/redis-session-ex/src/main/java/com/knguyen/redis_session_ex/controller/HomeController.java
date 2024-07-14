package com.knguyen.redis_session_ex.controller;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import java.security.Principal;



public class HomeController {


    /**
     * + Home View Count:
     * Our plan is to implement a way to see how many times the user has viewed the home route. So everytime
     * they refresh the page, this count increases. So we'll do this by attaching a property to their session object, each
     * time the user refreshes, our server will get their session ID and then give us the session object. Then
     * we'll increment this 'HOME_VIEW_COUNT' property that's on the session object.
     */
    private final String HOME_VIEW_COUNT = "HOME_VIEW_COUNT";


    /**
     *
     *
     *
     *
     * @param principal - The 'principal' is just the user making the request to our backend.
     * @param session - The session object that's associated with a client
     *
     */
    @GetMapping("/")
    public String home(Principal principal, HttpSession session) {


        // Call our custom function to increment the count of a session object and its property
        // here we're incrementing the property 'HOME_VIEW_COUNT' which we've put as a variable
        incrementCount(session, HOME_VIEW_COUNT);

        return "Hello, " + principal.getName();
    }

    @GetMapping("/count")
    public String home(HttpSession session) {
        return "HOME_VIEW_COUNT: " + session.getAttribute(HOME_VIEW_COUNT);
    }

    /**
     *
     * @param session
     * @param attr - Attribute value that we want to increment on our session object
     */
    private void incrementCount(HttpSession session, String attr) {

        // Get the homeViewCount from our session object; if it doesn't exist return 0 (view count starts at zero), else
        // get the attribute's value and convert it into an integer
        var homeViewCount = session.getAttribute(attr) == null ? 0 : (Integer) session.getAttribute(attr);

        // Now update the attribute on the session, which is the value of HOME_VIEW_COUNT in this case
        session.setAttribute(attr, homeViewCount += 1);
    }
}
