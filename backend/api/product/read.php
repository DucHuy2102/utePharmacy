<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate category object
$product = new Product($db);

// Category read query
$result = $product->read();

// Get row count
$num = $result->rowCount();

// Check if any categories
if ($num > 0) {
    // Cat array
    $pd_arr = array();
    $pd_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $pd_item = array(
            'product_id' => $product_id,
            'name' => $name,
            'brand' => $brand,
            'name' => $name,
            'ram' => $ram,
            'price' => $price,
            'old_price' => $old_price,
            'amount' => $amount,
            'rating' => $rating,
            'num_reviewer' => $num_reviewer,
            'img_cover' => $img_cover,
            'cpu' => $cpu,
            'description' => $description,
            'isDisabled' => $isDisabled,
        );

        // Push to "data"
        array_push($pd_arr['data'], $pd_item);
    }

    // Turn to JSON & output
    echo json_encode($pd_arr);

} else {
    // No Categories
    echo json_encode(
        array('message' => 'No Categories Found')
    );
}