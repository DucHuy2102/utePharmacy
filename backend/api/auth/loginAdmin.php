<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Admin.php';
// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post objectAdmin
$user = new Admin($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

$user->username = $data->username;
//$user->password = $data->password;

if ($user->login()) {
    if (password_verify($data->password, $user->password)) {
        echo json_encode(
            array('message' => 'Login successful',
                'status' => 'OK',
                'admin_id' => $user->admin_id)
        );
        return;
    }
}
echo json_encode(
    array('message' => 'Login failed.',
        'status' => 'error')
);