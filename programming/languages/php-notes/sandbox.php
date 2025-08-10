<?php
session_start();

// Null coalescence is a lot more concise than isset()
$name = $_SESSION['name'] ?? 'Guest';
$gender = $_COOKIE['gender'] ?? 'Unknown';

// Handle form submission to set or clear the name
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST['name'])) {
    // Set the name in session
    $_SESSION['name'] = $_POST['name'];


    // cookie for gender
    /*
    - Session cookies: Session data stored on server.

    - Persistent cookies: Just stored in user's browser. Commonly
    used for advertising and tracking. 
    Remember that cookies have a specific time out and stay alive until then regardless
    of whether or not you close the browser. Then your session cookies will 
    be destroyed after your close the browser.
     */
		setcookie('gender', $_POST['gender'], time() + 86400); // expires in 1 day
  } elseif (isset($_POST['clear'])) {
    // Clear the name from session
    unset($_SESSION['name']);

    // Delete a persistent cookie by setting its expiration to a past date
    setcookie('gender', '', time() - 3600, '/');
  }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Session Example</title>
</head>
<body>
  <h1>Welcome, <?php echo $name; ?> (<?php echo $gender?>)!</h1>

  <form method="POST" action="">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name" value="<?php echo isset($_SESSION['name']) ? htmlspecialchars($_SESSION['name']) : ""; ?>">
    <select name="gender">
			<option value="male">male</option>
			<option value="female">female</option>
		</select>
    <button type="submit">Submit</button>
    
  </form>

  <form method="POST" action="">
    <button type="submit" name="clear">Clear Name</button>
  </form>
</body>
</html>
