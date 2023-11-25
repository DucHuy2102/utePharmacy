<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/ImageProduct.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$product = new ImageProduct($db);

// Get ID
$product->product_id = isset($_GET['id']) ? $_GET['id'] : die();

// Get product
$result = $product->read_single();

$num = $result->rowCount();

if ($num > 0) {
    // Cat array
    $pd_arr = array();
    // $pd_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $pd_item = array(
            // 'product_id' => $product_id,
            'id' => $id,
            'url' => $url,
        );

        // Push to "data"

        array_push($pd_arr, $pd_item);
    }

    // Turn to JSON & output
    echo json_encode($pd_arr);

} else {
    // No Categories
    echo json_encode(
        array('message' => 'No Categories Found')
    );
}