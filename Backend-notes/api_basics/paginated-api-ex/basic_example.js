const express = require("express")

const app = express()

const users = [
    {
        id: 1,
        name: "User 1",
    },
    {
        id: 2,
        name: "User 2",
    },
    {
        id: 3,
        name: "User 3",
    },
    {
        id: 4,
        name: "User 4",
    },
    {
        id: 5,
        name: "User 5",
    },
    {
        id: 6,
        name: "User 6",
    },
    {
        id: 7,
        name: "User 7",
    },
    {
        id: 8,
        name: "User 8",
    },
    {
        id: 9,
        name: "User 9",
    },
    {
        id: 10,
        name: "User 10",
    },
]

const posts = [
    {
        id: 1,
        name: "Post 1",
    },
    {
        id: 2,
        name: "Post 2",
    },
    {
        id: 3,
        name: "Post 3",
    },
    {
        id: 4,
        name: "Post 4",
    },
    {
        id: 5,
        name: "Post 5",
    },
    {
        id: 6,
        name: "Post 6",
    },
    {
        id: 7,
        name: "Post 7",
    },
    {
        id: 8,
        name: "Post 8",
    },
    {
        id: 9,
        name: "Post 9",
    },
    {
        id: 10,
        name: "Post 10",
    },
]

/*
+ Situation: In a real app, there could be thousands of users, so you don't want to get them all in one list. That would be an expensive
database query. 

- Solution: Use pagination in our api. Let the request be like  this: "/users?page=1&limit=10" to indicate pages from 1 up to the page number they want and number of results (users in this case) for each page. 

- How to do this:
1. Get those search parameters from the request. Search parameters are in 'req.query', so do 'req.query.page' to get 'page' parameter. Then 'req.query.limit' to get 'limit' parameter.

2. Create a start and ending index. Start index is 'page - 1' since pages start at 1 for people, whilst our array starts at 0. Then we just return the users array from the start index to the end index. 

- Takeaway: Given '?page=1&limit=10', startIndex is 0, while endIndex is 10. So we return users[0] to users[9], which would be the first 10 users. If you do '?page=2&limit=10', startIndex is 10, while endIndex is 20. You would return the users from users[10] to users[19], which is the next 10 users. This is the basic idea behind pagination.

+ Returning links for the previous and next pages.
- In APIs, you'd also return links for the previous and next pages. This makes it easier for the client to navigate through the pages, let them know what page they're on.

1. If our startIndex > 0, that means we still have a previous page to go to. So we create 'prev'. If our endIndex < users.length, that means we still have a next page to go to. So we create 'next'.

- NOTE: Of course the next page may not have 'limit' users on it. Like if we only had 13 users and the limit was 10, we'd have 10 users on the first page, and only 3 on the next. Which is why 'limit' only indicates the maximum amount of results you could possibly get.

+ Using middleware to reduce repetition:
- ISSUE: If we have another model, we don't want to have to repeat our pagination code. 
- SOLUTION: Let's create paginateResults, a middleware that handles our pagination for us. 

- How to:
+ paginatedResults: A higher order function, that just returns a function that paginates a model for us.

*/
app.get("/users", paginatedResults(users), (req, res) => {
    // Search params; strings by default so make them integers

    res.status(200).json(res.paginatedResults)
})

app.get("/posts", paginatedResults(posts), (req, res) => {
    res.status(200).json(res.paginatedResults)
})

function paginatedResults(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        // Indexes
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        // Create 'prev' and 'next' objects
        if (endIndex < users.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            }
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
                limit: limit,
            }
        }

        /*
    - Results object containing 'prev', 'next', and 'users'.
    Doing results[model] should use the name of the model for the property name
    */

        const results = {}
        results[model] = model.slice(startIndex, endIndex)

        // Store the results inside our response variable and call next()
        res.paginatedResults = results
        next()
    }
}

app.listen(3000, () => {
    console.log("server started")
})
