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

$post->name = $data->name;
$post->url = $data->url;
$post->product_code = $data->product_code;
$post->brand = $data->brand;
$post->cpu = $data->cpu;
$post->ram = $data->ram;
$post->gpu = $data->gpu;
$post->os = $data->os;
$post->old_price = $data->old_price;
$post->price = $data->price;
$post->screen = $data->screen;
$post->size = $data->size;
$post->battery = $data->battery;
$post->amount = $data->amount;
$post->description = $data->description;
$post->rating = $data->rating;
$post->num_reviewer = $data->num_reviewer;
$post->img_cover = $data->img_cover;

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