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
$user->password = $data->password;

if($user->login()) {
  if(password_verify($data->password, $user->password)) {
    $user->update_pass($data->username, $data->new_password);
    echo json_encode(
      array('message' => 'Update your password successful !!!',
      'status' => 'Success',
      'user_id' => $user->user_id)
    );
    return;
  }
}
echo json_encode(
  array('message' => 'Yours password is not correct !!', 
  'status' => 'Fail')
);

