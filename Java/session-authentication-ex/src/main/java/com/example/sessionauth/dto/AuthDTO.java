package com.example.sessionauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.json.Json;
import javax.json.JsonObject;


/**
 * A DTO for containing information. So our JsonProperty annotations should map those properties in the request body,
 * assuming request body isn't messed up, to those field properties.
 *
 * For simplicity's sake, you'd use this to represent the request body when logging in and signing up a user.
 * So when signing up the user just needs to provide an email and password, and that styas the same for logging in.
 *
 */
public record AuthDTO(@JsonProperty("email") String email, @JsonProperty("password") String password) {

    // Needed for integration testing; custom method to convert the DTO into JSON format
    public JsonObject convertToJSON() {
        return Json.createObjectBuilder()
                .add("email", email())
                .add("password", password())
                .build();
    }
}
