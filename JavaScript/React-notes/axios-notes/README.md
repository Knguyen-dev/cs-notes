# Axios Tutorial

#### What is Axios?
Axios is a popular JavaScript library used for making HTTP requests from the browser to a backend application. 
It provides a simpler way to do requests than the built in fetch API, and has some additional features. Here
are some benefits it has over fetch:

1. Has url in the request object, so you just have to define the endpoint you're hitting
  with 'url'.
2. Has built-in XSRF protection. This helps mitigate requests being sent from a user's
  browser without their knowledge.
3. Uses 'data' property instead of 'body'. So when doing something like a POST request, we pass
  our data into the 'data' property instead of the 'body' property with fetch.
4. Automatically transforms json data, so you don't have to do response.json() to parse json.
5. Allows the cancelling of requests. Useful in situations when user navigates away from a page,
  we want to cancel the request for data since they're not looking at that page anymore.
6. Has built-in support for download progress. Neat feature that can give you the option of telling
  your users when something is done downloading.
7. Supports a wider range of browsers than fetch.

#### Axios Documentation

[Axios Docs](https://axios-http.com/docs/intro)

#### Install

```sh
npm install axios
```

```js
<script src='https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'></script>
```

#### First Request
- If you just do axios(url), the default is a GET request. Note that 
  axios returns a promise, so you can use either promise syntax or async/await if you want.
  
- import axios
- axios.get(url)
- axios.post(url)
- axios.patch/put(url)
- axios.delete(url)

- response data located in data property
- error in error.response

```js
import axios from 'axios';

const fetchData = async () => {
  try {
    // axios.get(), axios.post(),axios.put(), axios.delete()
    const response = await axios(url);

    console.log(response);
  } catch (error) {
    console.log(error.response);
  }
};
```

#### Headers

- second argument
- axios.get(url,{})

- third argument in requests with data
- axios.post(url,{data},{})

```js
const fetchDadJoke = async () => {
  try {
    const { data } = await axios(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    // console.log(data);
    setJoke(data.joke);
  } catch (error) {
    console.log(error.response);
  }
};
```

#### Post Request

- send data to the server
- axios.post(url, { data })
- more options (auth header) - axios.post(url, { data },{})

```js
try {
  const resp = await axios.post(url, { data });
} catch (error) {
  console.log(error.response.data);
}
```

#### Global Defaults

```js
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
```

#### Custom Instance

```js
const authFetch = axios.create({
  baseURL: 'https://course-api.com',
  headers: {
    Accept: 'application/json',
  },
});
```

#### Interceptors

- global and custom

```js
authFetch.interceptors.request.use(
  (request) => {
    request.headers.common['Accept'] = `application/json`;
    console.log('request sent');
    // must return request
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    console.log('got response');
    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 404) {
      // do something
      console.log('NOT FOUND');
    }
    return Promise.reject(error);
  }
);
```
