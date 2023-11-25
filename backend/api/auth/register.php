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
$data = json_decode(file_get_contents("php://input"));

$user->username = $data->username;
$user->password = password_hash($data->password, PASSWORD_DEFAULT);
$user->fName = $data->fName;
$user->lName = $data->lName;
$user->url_avt = $data->url_avt;
// Create Category
if($user->create()) {
  echo json_encode(
    array('message' => 'Account Created', 'status' => 'Success')
  );
} else {
  echo json_encode(
    array('message' => 'Account Not Created', 'status' => 'Fail')
  );
}
