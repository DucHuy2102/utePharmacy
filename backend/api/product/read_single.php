<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$product = new Product($db);

// Get ID
$product->id = isset($_GET['id']) ? $_GET['id'] : die();

// Get product
$product->read_single();

// Create array
$product_arr = array(
    'product_id' => $product->product_id,
    'name' => $product->name,
    'url' => $product->url,
    'product_code' => $product->product_code,
    'brand' => $product->brand,
    'cpu' => $product->cpu,
    'ram' => $product->ram,
    'gpu' => $product->gpu,
    'os' => $product->os,
    'old_price' => $product->old_price,
    'price' => $product->price,
    'screen' => $product->screen,
    'size' => $product->size,
    'battery' => $product->battery,
    'amount' => $product->amount,
    'description' => $product->description,
    'rating' => $product->rating,
    'num_reviewer' => $product->num_reviewer,
    'img_cover' => $product->img_cover,
);

// Make JSON
print_r(json_encode($product_arr));
