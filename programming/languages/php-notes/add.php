<?php
  /**
   * Include our database since we know we're going to use it 
   * to insert new pizzas in the database. Again this allows us to access the 
   * stuff declared in that file. 
   */
	include('config/db_connect.php');

  
  /*
  + Forms and handling data being sent
    1. We render default form. 
    2. Client sends request to backend. This runs that add.php route again.
    3. We listen for whether data was sent. Here since we
       set them up to send a POST request.

    - If data is sent to the server, then the 'submit' value inside the 
      get map will actually have a value. Now we want to process the data
    - Else, if it's not set then they haven't sent data yet. This describes cases 
      such as the user visiting the page but not submitting the form. As a result 
      we'll just send back the default form to the browser

  + Preventing Cross Site Scripting:
  For any website, please sanitize input data from the user. God 
  forbid the user submits JavaScript Code as input in their blog post. 
  Then when a user clicks on that blog post it runs the JavaScript and 
  ruins their entire day.

  In PHP you use 'htmlspecialchars' and it converts any special HTML characters 
  into HTML entities. As a result, Something like <div> Middle </div> would become 
  
  &lt;div&gt; Middle &lt;/div&gt;. As a result, even if they inputted JavaScript, the 
  code won't be able to run since we've sanitized it.

  + Server Side Validation with PHP
  We'll use the 'empty' function to see if what they sent 
  was empty data. If it was, then render an error message on the form.

  Filters are validation functions that are already built into PHP. For example, PHP 
  has a filter that allows you to differentiate a valid vs invalid email. 
  */
  $errors = array('email' => '', 'title' => '', 'ingredients' => '');

  /*
  Initialize these variables are empty strings so that they can be used in the input fields. 
  The first time the user lands on the page, we can output empty strings in the input fields.
  Then when the user submits, we get actual values for title, email, and ingredients, and then 
  we can display those values in those fields. The idea is that even after form submission, 
  we want the input to be retained for a better user experience.
  */
	$email = $title = $ingredients = '';
	

  // If they submitted something, then run our submission logic
	if(isset($_POST['submit'])){	
		// check email
		if(empty($_POST['email'])){
			$errors['email'] = 'An email is required';
		} else{
			$email = $_POST['email'];
			if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
				$errors['email'] = 'Email must be a valid email address';
			}
		}

		// check title
		if(empty($_POST['title'])){
			$errors['title'] = 'A title is required';
		} else{
			$title = $_POST['title'];
			if(!preg_match('/^[a-zA-Z\s]+$/', $title)){
				$errors['title'] = 'Title must be letters and spaces only';
			}
		}

		// check ingredients
		if(empty($_POST['ingredients'])){
			$errors['ingredients'] = 'At least one ingredient is required';
		} else{
			$ingredients = $_POST['ingredients'];
			if(!preg_match('/^([a-zA-Z\s]+)(,\s*[a-zA-Z\s]*)*$/', $ingredients)){
				$errors['ingredients'] = 'Ingredients must be a comma separated list';
			}
		}

		if(array_filter($errors)){
			//echo 'errors in form';
		} else {
			// escape sql chars
			$email = mysqli_real_escape_string($sql_connection, $_POST['email']);
			$title = mysqli_real_escape_string($sql_connection, $_POST['title']);
			$ingredients = mysqli_real_escape_string($sql_connection, $_POST['ingredients']);

			// create sql
			$sql = "INSERT INTO pizzas(title,email,ingredients) VALUES('$title','$email','$ingredients')";

			// save to db and check
			if(mysqli_query($sql_connection, $sql)){
				// success
				header('Location: index.php');
			} else {
				echo 'query error: '. mysqli_error($sql_connection);
			}
			
		}

	} // end POST check

?>

<!DOCTYPE html>
<html>
	
	<?php include('templates/header.php'); ?>

	<section class="container grey-text">
		<h4 class="center">Add a Pizza</h4>

    
		<!-- <form class="white" action="add.php" method="POST"> 
      
    Instead of using add.php to reload the page with data, you'll often just 
    use the superglobal server and 'PHP_SELF' which returns the path of the current php
    file, relative to local host.
    -->
    <form class="white" action="<?php echo $_SERVER['PHP_SELF']?>" method="POST">
			<label>Your Email</label>
			<input type="text" name="email" value="<?php echo htmlspecialchars($email) ?>">
			<div class="red-text"><?php echo $errors['email']; ?></div>
			<label>Pizza Title</label>
			<input type="text" name="title" value="<?php echo htmlspecialchars($title) ?>">
			<div class="red-text"><?php echo $errors['title']; ?></div>
			<label>Ingredients (comma separated)</label>
			<input type="text" name="ingredients" value="<?php echo htmlspecialchars($ingredients) ?>">
			<div class="red-text"><?php echo $errors['ingredients']; ?></div>
			<div class="center">
				<input type="submit" name="submit" value="Submit" class="btn brand z-depth-0">
			</div>
		</form>
	</section>

	<?php include('templates/footer.php'); ?>

</html>