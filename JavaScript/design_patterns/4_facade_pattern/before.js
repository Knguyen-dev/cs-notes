/*
- The getUsers and getUserPosts both work and complete the task, however
we can see some problems with them. 

1. They aren't separating business logic from code logic. The business logic would be 
  'get all user data' or 'get all posts for a specific user'. Whilst the complex code would 
  be 'use fetch api, with method get, specify some headers, and then in your promise turn the 
  stuff in json'. The API is also kind of hard to use as we have this complex/ugly details 
  everytime for the fetch API. You have to specify headers, method, etc.
  every time.
2. Also finally you can see there's some repetition, and that could be fixed. 
3. Finally, if you wanted to convert things to to axios, or a different library for fetching 
  data you'd have to change all of your functions from fetch to that different library.

*/

function getUsers() {
    return fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
}

function getUserPosts(userId) {
    return fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    ).then((res) => res.json())
}

getUsers().then((users) => {
    users.forEach((user) => {
        getUserPosts(user.id).then((posts) => {
            console.log(user.name)
            console.log(posts.length)
        })
    })
})
