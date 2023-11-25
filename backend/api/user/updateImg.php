<?php 
  // Headers 
  header('Access-Control-Allow-Origin: http://localhost:3000');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');
  
  include_once '../../config/Database.php';
  include_once '../../models/User.php';

  $database = new Database();
  $db = $database->connect();
  // Instantiate DB & connect
  $user = new User($db);


  $data = json_decode(file_get_contents("php://input"));
  $user->user_id = $data->user_id;
  $user->url_avt = $data->url_avt;
  // Instantiate category object
  $user = new User($db);

  // Category read query
  if($user->update_Img($data->user_id, $data->url_avt))
    echo "Update Done (user_id = " .  $data->user_id . " with new image with = " . $data->url_avt . ")";
    // echo $user->update_Img($data->user_id, $data->url_avt);
  else echo "Error";