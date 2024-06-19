package com.Http;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;


/**
 * Utility class helps create a query string 'param=somevalue&param2=somevalue2'.
 *
 * StringBuilder: More efficient than using string concatenation in a loop, especially when dealing with a large
 *                number of string modifications. Everytime we concatenate a string, a new string object is created.
 *                More strings being created, and also discarded, which increases memory usage and more frequent garbage
 *                collection.
 *
 *                StringBuilder uses an array of characters with flexible size. It grows in 'chunks' and essentially
 *                reduces number of memory allocations. StringBuilder should be used in scenarios where you perform
 *                numerous modifications to a string such as appending, inserting, and deleting characters.
 *
 *                1. Building strings in loops
 *                2. Adding strings to the end or inserting, or deleting
 *                3. When dynamically creating SQL queries.
 *                4. Reading from a file. If you need to append lines of string data somewhere, store it in the StringBuilder
 *
 * - NOTE: Just don't use it in simple concatenations, or when the readability of using String is a lot more important.
 */
public class ParameterStringBuilder {
     public static String getParamsString(Map<String, String> params) {
         StringBuilder result = new StringBuilder();

         // For each key-value pair in the request parameter map, concatenate those query parameters and their values
         // our StringBuilder
         for (Map.Entry<String, String> entry : params.entrySet()) {
             result.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8));
             result.append("=");
             result.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
             result.append("&");
         }

         String resultString = result.toString();

         // If we have a result string, return that result string, but get rid of last letter, which should be the extra '&'
         // from the last iteration of the loop. Else return I guess nothing?
         return !resultString.isEmpty() ? resultString.substring(0, resultString.length() - 1) : resultString;
     }
}
