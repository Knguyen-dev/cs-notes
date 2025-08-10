package com.Http;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.net.http.HttpRequest;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import static java.util.concurrent.TimeUnit.SECONDS;

/**
 * + How to make HTTP Requests in Java:
 * 1. You can use the 'java.net' package with the 'HttpURLConnection' class to do this. This is the first or the
 * original HTTP library for Java essentially, so yeah it's pretty old and some of the stuff is quite cumbersome.
 *
 *
 * 2. HTTP Client library: A relatively newer http library that aims to replace the old one. It gives us synchronous
 * and asynchronous request mechanism.
 *
 * 1. 'HttpRequest': The request object
 * 2. 'HttpClient': A container for common configuration information that you have may for multiple requests.
 * 3. 'HttpResponse' Results of your http request
 */

public class Main {
    public static void main(String[] args) {
    }

    //
    // Credits: https://www.baeldung.com/java-http-request
    private static void withUrlConnection() {
        try {
            // Create URL object with the target URL
            URL url = new URL("https://jsonplaceholder.typicode.com/posts/1");

            // Prepare any request parameters in a map; so this is where you'd put form data
            Map<String, String> requestParameters = new HashMap<>();
            requestParameters.put("param1", "val1");

            // Open a connection to the URL
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // You can set the request method like this;
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");

            // If request requires sending data (e.g. post request), but doing this also lets us set request data on the request
            connection.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(connection.getOutputStream());
            out.writeBytes(ParameterStringBuilder.getParamsString(requestParameters));
            out.flush();
            out.close();

            // Read response data; probably where you send the request? ; so the status code and then the content of the resopnse into a
            int status = connection.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            connection.disconnect();
        } catch (MalformedURLException e) {
            System.out.println("Bad url");
        } catch (IOException e) {
            System.out.println("Bad IO");
        }

    }

    private static void withClientLibrary() throws URISyntaxException {

        HttpRequest request1 = HttpRequest.newBuilder()
                .uri(new URI("http://someApi.com"))
                .header("Authorization", "Bearer <access_token>")
                .header("Content-Type", "application/json")
                // Time we want to wait until a response; if set time expires then an HttpTimeoutException is thrown.
                // Probably good to set this to a reasonable time, since the default is infinity
                .timeout(Duration.of(10, SECONDS.toChronoUnit()))
                .GET()
                .build();

        // A post request with no data in request body
        HttpRequest request2 = HttpRequest.newBuilder().uri(new URI("http://someApi.com")).POST(HttpRequest.BodyPublishers.noBody()).build();


        /*
        - You can pass a string representing your json data into the body with 'StringBodyPublisher'.
        {
            username: "some-username",
            password: "some-password
        }
        */
        // Login data as a JSON object
        String loginData = "{\"username\": \"your_username\", \"password\": \"your_password\"}";
        HttpRequest request3 = HttpRequest.newBuilder().uri(new URI("http://someApi.com")).POST(HttpRequest.BodyPublishers.ofString("Sample request body")).build();

    }



}
