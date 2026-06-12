# Explaining cURL
Curl is a command line tool for transferring data with URLs. It supports common protocols like HTTP, HTTPS, FTP, etc. There are some common use cases such as testing APIs via a CLI or downloading files from remote servers. Curl comes preinstalled on most Linux and MacOS systems. 

## HTTP Requests

### GET Requests
```bash
# 
# GET request to example.com
curl https://example.com

# Save the output of the GET request to a example.html 
curl -o example.html https://example.com

# Only show the response headers
# NOTE: Can also use --head flag
curl -I https://example.com
```

### POST Requests
```bash
# Making a POST request to example.com and encoding form fields in 
# the request body.
curl -X POST -d 'name=John&email=john@example.com' https://example.com/form

# Passing JSON data in the POST request
curl -X POST -d '{"name":"John", "email":"john@example.com"}' -H 'Content-Type: application/json' https://example.com/users
```

### DELETE Requests
```bash
curl -X DELETE https://api.example.com/users/123
```

### PUT (Full Replace) Request
```bash
curl -X PUT https://api.example.com/users/123 \
  -H "Content-Type: application/json" \
  -d '{
        "username": "Jdoe_updated",
        "email": "john@example.com",
        "status": "active"
      }'
```

### PATCH (Partial Update)
```bash
curl -X PATCH https://api.example.com/users/123 \
     -H "Content-Type: application/json" \
     -d '{"status": "away"}'
```

## Setting Headers
```
-H "Authorization: Bearer ${JWT_TOKEN}" // Authentication
-H "User-Agent: Mozilla/5.0" // Spoof browser 
-H "Accept: application/xml" // Format 
```
We can set any custom headers with the `-H "Header: value"`


## Tips for cURL
- **Verbose Mode (`-v`):** If your request isn't working, add `-v` to see the full workflow.
- **Sending Files:** If your JSON is long, save it to a file (e.g., `data.json`) and update your command to do `-d @data.json`.
- **Timing Requests:** To get the performance metrics on cURL calls, we can time the duration with `-w`. For example: `curl -w "@total_time" -o /dev/null https://example.com`

## Credits
- [cURL Beginner's Guide - TheLinuxCode](https://thelinuxcode.com/how-to-start-using-curl-a-beginners-guide/)
- [cURL Docs](https://curl.se/docs/tutorial.html)
- [cURL Cheatsheet](https://devhints.io/curl)
