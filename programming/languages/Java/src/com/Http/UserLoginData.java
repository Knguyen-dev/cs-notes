package com.Http;


public class UserLoginData {
    private String username;
    private String password;
    public UserLoginData(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public UserLoginData() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /*
     * How to convert a Java object into JSON?
     * 1. Jackson: A Java-based library
     * 2. GSON: A Google based library
     *
     * To do these you have to build your project with an open-source build
     * tool such as "Maven" primarily used for Java projects. We will work about this later
     *
     * https://www.youtube.com/watch?v=9oq7Y8n1t00
     */

}
