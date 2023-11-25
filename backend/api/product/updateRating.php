<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$post = new Product($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

// Set ID to update
$post->product_id = $data->product_id;
$post->num_reviewer = $data->num_reviewer;
$post->rating = $data->rating;

// Update post
if ($post->updateRating()) {
    echo json_encode(
        array('message' => 'Rating  Updated',
        )
    );
} else {
    echo json_encode(
        array('message' => 'Rating Not Updated')
    );
}