<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$post = new User($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

// Set ID to update

$post->user_id = $data->user_id;
$post->username = $data->username;
$post->password = $data->password;
$post->fName = $data->fName;
$post->lName = $data->lName;
$post->email = $data->email;
$post->phone = $data->phone;
$post->birthday = $data->birthday;
$post->url_avt = $data->url_avt;
$post->isBlocked = $data->isBlocked;

// Update post
if ($post->update()) {
    echo json_encode(
        array('message' => 'Post Updated',
        )
    );
} else {
    echo json_encode(
        array('message' => 'Post Not Updated')
    );
}