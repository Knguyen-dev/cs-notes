<?php 

  include("config/db_connect.php");

  // Store our SQL Queries in variables
  $sql = "SELECT title, ingredients, id FROM pizzas ORDER BY created_at";

  // Execute query and get the result set of rows
  $result = mysqli_query($sql_connection, $sql);

  // Fetch the rows from the SQL result set object; returns results as as an associative array
  /**
   * + Obtain the resulting rows as an array of objects (associative arrays)
   * 
   * pizzas = [
   *  {
   *    title: "some-title",
   *    ingredients: "tomato,cheese,sausage",
   *    id: some-id
   *  }, ...
   * ]
   * 
   * 
   */
  $pizzas = mysqli_fetch_all($result, MYSQLI_ASSOC);

  // Free SQL query result from memory; don't really need it anymore since we've extracted its data
  mysqli_free_result($result);

  // Close the SQL connection
  mysqli_close($sql_connection);
    
?>

<!DOCTYPE html>
<html lang="en">
  <?php include("templates/header.php"); ?>

  <h4 class="center grey-text">Pizzas!</h4>
  <div class="container">
    <div class="row">

      <!-- Iterate through every pizza in 'pizzas' array, we're going to render markup.
       Each column will be a pizza. Materialize has a 12 column system so on small screens we only show 
       2 pizzas. On medium screens 4.
      -->
      <?php foreach($pizzas as $pizza): ?>
        <div class="col s6 md3">

          <div class="card z-depth-0">
            <div class="card-content center">
              <h6><?php echo htmlspecialchars($pizza['title'])?></h6>

              <!-- Iterate through pizza's ingredients to render them-->
              <ul>
                <?php foreach(explode(",", $pizza["ingredients"]) as $ing): ?>
                  <li><?php echo htmlspecialchars($ing)?> </li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="card-action right-align">
              <!-- Redirect to the details page, include id of pizza in the url query parameters -->
              <a href="details.php?id=<?php echo $pizza['id'] ?>" class="brand-text">More Info</a>
            </div>
          </div>

        </div>
      <?php endforeach; ?>
      
      <!-- Conditional rendering in PHP -->
      <?php if (count($pizzas) >= 3): ?>
        <p>There are 3 or more pizzas on our menu!</p>
      <?php else: ?>
        <p>There are less than 3 pizzas on the menu!</p>
      <?php endif; ?>
    </div>
  </div>

  <?php include("templates/footer.php"); ?>
</html>
