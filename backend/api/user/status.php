<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/User.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$product = new User($db);

// Get ID
$product->user_id = isset($_GET['id']) ? $_GET['id'] : die();

// Get product
$product->read_single();

$product->isBlocked = 1 - $product->isBlocked;
// Create array
// $product->update();
// Update post
if ($product->update()) {
    echo json_encode(
        array('message' => 'status is upadte',
        )
    );
} else {
    echo json_encode(
        array('message' => 'Post Not Updated')
    );
}