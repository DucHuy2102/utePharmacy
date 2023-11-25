<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';
// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$user = new User($db);

// Get raw posted data
$user->user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();
$result = $user->read_single();
$num = $result->rowCount();
// Check if any categories
if ($num > 0) {
  // Cat array
  $pd_arr = array();
  $pd_arr['data'] = array();
  $row = $result->fetch(PDO::FETCH_ASSOC);
  extract($row);
  $user_infor = array(
    'user_id' => $user_id,
    'username' => $username,
    'fName' => $fName,
    'lName' => $lName,
    'email' => $email,
    'phone' => $phone,
    'birthday' => $birthday,
    'url_avt' => $url_avt,
);
  // Turn to JSON & output
  echo json_encode($user_infor);
} else {
  // No Categories
  echo json_encode(
    array('message' => 'Cannot find user')
  );
}
