<?php 
  // Headers
  header('Access-Control-Allow-Origin: http://localhost:3000');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Cart.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate category object
  $cart = new Cart($db);
  $user_id = $_SERVER["QUERY_STRING"];
  // Category read query
  $result = $cart->find_product(substr($user_id, 8));
  // Get row count
  $num = $result->rowCount();

  // Check if any categories
  if($num > 0) {
        // Cat array
        $pd_arr = array();
        $pd_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $pd_item = array(
            'name' => $name, 
            'img_cover' => $img_cover,
            'price' => $price,
            'amount' => $amount,
            'cpu' => $cpu,
            'screen' => $screen,
            'product_id' => $product_id,
            'available' => $available,
            
          );

          // Push to "data"
          array_push($pd_arr['data'], $pd_item);
        }

        // Turn to JSON & output
        echo json_encode($pd_arr);

  } else {
        // No Categories
        echo json_encode(
          array('message' => 'No Product in Found')
        );
  }
