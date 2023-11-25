<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Comment.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate category object
$product = new Comment($db);

// Get ID
$product->product_id = isset($_GET['product_id']) ? $_GET['product_id'] : die();

// Category read query
$result = $product->read_single();

// Get row count
$num = $result->rowCount();

// Check if any categories
if ($num > 0) {
    // Cat array
    $pd_arr = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $pd_item = array(
            // 'id' => $id,
            'product_id' => $product_id,
            'user_id' => $user_id,
            'comment' => $comment,
            'rate' => $rate,
            'datetime' => $datetime,
            'username' => $username,
            'fName' => $fName,
            'lName' => $lName,
            'url_avt' => $url_avt,
        );

        array_push($pd_arr, $pd_item);
    }

    // Turn to JSON & output
    echo json_encode($pd_arr);
} else {
    // No Categories
    echo json_encode(
        array()
    );
}
