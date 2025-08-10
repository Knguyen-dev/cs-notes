/*
+ Catalog route module: Here we make the router for our catalog section
  of our site.

1. We'll import our controller modules, have our callbacks and route handling 
  functions for each of our catalog routes. So 


*/

const express = require("express");
const router = express.Router();

// Import our controllers.
const author_controller = require("../controllers/authorController");
const book_controller = require("../controllers/bookController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookInstanceController");

// Catalog home page or index route
router.get("/", book_controller.index);

/*
+ Book routes:
- Create a GET and POST request for each of the following:
1. Creating a book
2. Deleting a book (dynamic route)
3. Updating a book (dynamic route)

- Creating GET requests: 
1. Getting a book's details
2. Getting a list of books

- NOTE: 
1. GET request for creating book must come before the dynamic
  routes '/book/:id', so that 'create' isn't treated like an id, 
  it's its own route. This applies to the rest of our routes and is 
  an easy to miss and fix mistake.

2. The reason the only dynamic routes are for deleting, updating,
  and getting a book's or an item's details, is because we need the id of the 
  book in question. For creating a book, we don't need an id parameter
  since the book doesn't exist yet, and for listing all items, we 
  can just select all documents in the respective collection.

*/
router.get("/book/create", book_controller.book_create_get);
router.post("/book/create", book_controller.book_create_post);

router.get("/book/:id/delete", book_controller.book_delete_get);
router.post("/book/:id/delete", book_controller.book_delete_post);

router.get("/book/:id/update", book_controller.book_update_get);
router.post("/book/:id/update", book_controller.book_update_post);

router.get("/book/:id", book_controller.book_detail);
router.get("/books", book_controller.book_list);

/*
+ Author Routes
1. Get and post request for creating an author
2. Get and post request for deleting an author
3. Get and post request for updating an author
4. Get route for getting an specific author's info 
5. Route for listing all authors in database.
*/

router.get("/author/create", author_controller.author_create_get);
router.post("/author/create", author_controller.author_create_post);

router.get("/author/:id/delete", author_controller.author_delete_get);
router.post("/author/:id/delete", author_controller.author_delete_post);

router.get("/author/:id/update", author_controller.author_update_get);
router.post("/author/:id/update", author_controller.author_update_post);

router.get("/author/:id", author_controller.author_detail);
router.get("/authors", author_controller.author_list);

/*
+ Genre Routes:
1. Get and post request for creating a genre
2. Get and post request for deleting a genre
3. Get and post request for updating a genre
4. Get route for getting an specific genre's info 
5. Route for listing all genres in database.
*/
router.get("/genre/create", genre_controller.genre_create_get);
router.post("/genre/create", genre_controller.genre_create_post);

router.get("/genre/:id/delete", genre_controller.genre_delete_get);
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

router.get("/genre/:id/update", genre_controller.genre_update_get);
router.post("/genre/:id/update", genre_controller.genre_update_post);

router.get("/genre/:id", genre_controller.genre_detail);
router.get("/genres", genre_controller.genre_list);

/*
+ Book instance routes:
1. Get and post request for creating a book instance
2. Get and post request for deleting a book instance
3. Get and post request for updating a book instance
4. Get route for getting an specific book instance's info 
5. Route for listing all book instances in database.
*/
router.get(
	"/bookinstance/create",
	book_instance_controller.bookinstance_create_get
);
router.post(
	"/bookinstance/create",
	book_instance_controller.bookinstance_create_post
);

router.get(
	"/bookinstance/:id/delete",
	book_instance_controller.bookinstance_delete_get
);
router.post(
	"/bookinstance/:id/delete",
	book_instance_controller.bookinstance_delete_post
);

router.get(
	"/bookinstance/:id/update",
	book_instance_controller.bookinstance_update_get
);
router.post(
	"/bookinstance/:id/update",
	book_instance_controller.bookinstance_update_post
);

router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);
router.get("/bookinstances", book_instance_controller.bookinstance_list);

// We then export our router for our 'catalog' routes
module.exports = router;
