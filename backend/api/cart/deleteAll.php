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
  $cart->deleteAll($_POST['user_id']);
  echo "DELETE All cart in Cart with User ID = " .  $_POST['user_id'];


