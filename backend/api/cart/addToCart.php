<?php
function cors()
{

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400'); // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
            // may also be using PUT, PATCH, HEAD etc {
            header("Access-Control-Allow-Methods: GET, POST, DELETE ,OPTIONS");
        }

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }

        exit(0);
    }

    // echo "You have CORS!";
}
cors();
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Cart.php';
// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$cart = new Cart($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

$cart->product_id = $data->product_id;
$cart->user_id = $data->user_id;
$cart->amount = $data->amount;


// Category read query
$result = $cart->read_single();
// Get row count
$num = $result->rowCount();

// Check if any categories
if ($num > 0) {
    // exist in database
    $row = $result->fetch(PDO::FETCH_ASSOC);
    extract($row);
    $oldAmount = $amount;
    
    if ($cart->updateItem($cart->user_id, $cart->product_id, $cart->amount + $oldAmount)) {
        echo json_encode(
            array('message' => 1)
        );
    } else {
        echo json_encode(
            array('message' => 0)
        );
    }
} else {
    // not exist in database
    if ($cart->create()) {
        echo json_encode(
            array('message' => 1)
        );
    } else {
        echo json_encode(
            array('message' => 0)
        );
    }
}
