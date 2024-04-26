// Now the business and complex logic are more separated.
// The api is a lot more concise and easier to use
function getUsers() {
    return getFetch("https://jsonplaceholder.typicode.com/users")
}

function getUserPosts(userId) {
    return getFetch("https://jsonplaceholder.typicode.com/posts", {
        userId: userId,
    })
}

getUsers().then((users) => {
    users.forEach((user) => {
        getUserPosts(user.id).then((posts) => {
            console.log(user.name)
            console.log(posts.length)
        })
    })
})

// Create our facade
// function getFetch(url, params = {}) {
//   const queryString = Object.entries(params).map(param => {
//     return `${param[0]}=${param[1]}`
//   }).join('&')
//   return fetch(`${url}?${queryString}`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" }
//   }).then(res => res.json())
// }

// Here's our facde, but now using axios
// Notice how the change was easy because we just did it in one function
function getFetch(url, params = {}) {
    return axios({
        url: url,
        method: "GET",
        params: params,
    }).then((res) => res.data)
}
