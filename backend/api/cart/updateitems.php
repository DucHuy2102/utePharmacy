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

  // Category read query
  $cart->updateItem($_POST['user_id'], $_POST['product_id'], $_POST['amount']);
  echo "Update Done (user_id = " .  $_POST['user_id'] . " with amount = " . $_POST['amount'] . ")";


