// Hypothetical login form logic for future reference.

// loginForm.addEventListener("submit", e=> {
//     e.preventDefault()
//     // If we pass basic checks
//     if (loginForm.checkValidity()) {
//         const isValidUsername = checkUsername()
//         if isValidUsername {
//             // Hide all error messages;
//         } else {
//             // Username is already taken so show an error message, or
//             // just make sure the feedback element has some message saying 'already taken'
//             // In this case, we can't be linking this to an oninputchange because querying the server
//             // constantly would be bad
//         }
//     } else {
//         // Show error for username feedback; thought this should be dealt with using
//         // an event listener that changes the text of the feedback element
//     }
//     // Add this so bootstrap puts in the styles
//     loginForm.classList.add("was-validated")
// })

// Simple form validation for our
const form = document.querySelector("#query-form")
const formFeedback = document.querySelector("#query-form-feedback")
form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
        e.preventDefault()
        formFeedback.classList.remove("content-hidden")
    } else {
        formFeedback.classList.add("content-hidden")
    }
    form.classList.add("was-validated")
})
